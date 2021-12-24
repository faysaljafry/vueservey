<template>
  <div>
    <admin-nav></admin-nav>
    <h1 class="text-3xl text-red-800">Fill The Survey Information</h1>
    <div class="flex flex-row gap-5 p-5">
      <input
        type="text"
        v-model="title"
        name="surveyTitle"
        id="surveyTitle"
        class="h-11 w-1/2 p-5 mt-10 border-2 rounded-lg"
        placeholder=" Enter the Title of Survey"
      />
      <input
        type="text"
        v-model="description"
        name="surveyDescription"
        id="surveyDescription"
        class="h-11 w-1/2 p-5 mt-10 border-2 rounded-lg"
        placeholder=" Enter a little description of Survey"
      />
    </div>

    <h1 class="text-3xl mt-4">Add Questions</h1>
    <div v-for="(data, index) in questions" :key="index">
      <input
        v-model="data.question"
        type="text"
        class="h-11 w-3/4 border-2 rounded-lg"
        placeholder="A question usually ends with a question mark"
      />
      <button
        @click="addAnswers(index)"
        class="p-4 ml-4 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Add Answers
      </button>
      <div class="grid grid-cols-1 md:grid-cols-3 ml-5 w-3/4 gap-3">
        <div v-for="(answer, Index) in answers[index]" :key="Index">
          <input
            v-model="answer.option"
            type="text"
            class="h-11 w-full border-2 rounded-lg m-10 p-3"
            placeholder="Enter your answer"
          />
        </div>
      </div>
    </div>
    <button
      @click="addQuestion(index)"
      class="p-4 ml-4 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Add another Question
    </button>
    <button
      @click="saveForm()"
      class="p-4 ml-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Save Form
    </button>
  </div>
</template>

<script>
import router from '../../router/index';
import adminNav from './adminnav.vue';
require('dotenv').config();
export default {
  data() {
    return {
      title: '',
      description: '',
      questions: [{ question: '' }],
      answers: [[{ option: '' }]],
      url: 'http://localhost:3000',
      // url: 'https://vuesurvey.herokuapp.com/',
    };
  },
  components: {
    adminNav,
  },

  beforeMount() {
    if (!localStorage.getItem('user')) {
      router.push('/admin/login');
    }
  },
  methods: {
    addAnswers(index) {
      console.log(this.answers);
      //   console.log('The answer Function');
      this.answers[index].push({
        option: '',
      });
    },
    addQuestion() {
      console.log(this.questions);
      this.questions.push({
        question: '',
      });
      this.answers.push([{ option: '' }]);
    },
    async saveForm() {
      console.log('Form Saved');
      this.$store.commit('saveNewSurvey', {
        questins: this.questions,
        answers: this.answers,
        title: this.title,
        description: this.description,
        activated: true,
      });
      fetch(`${this.url}/saveform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: this.questions,
          answers: this.answers,
          title: this.title,
          description: this.description,
          activated: true,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          // let data = JSON.parse(res);
          let data = res;
          console.log('inserted id is', data.insertedId);
          console.log('res', data);
          if (res.status == '200') {
            router.push('/admin/dashboard');
          }
        });
    },
  },
};
</script>
