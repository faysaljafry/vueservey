<template>
  <div>
    <admin-nav></admin-nav>
    <h1 class="text-3xl text-red-800">Fill The Survey Information</h1>
    <div class="flex flex-row">
      <input
        type="text"
        name="surveyTitle"
        id="surveyTitle"
        class="h-11 w-1/2 ml-10 mt-10 border-2 rounded-lg"
        placeholder=" Enter the Title of Survey"
      />
      <input
        type="text"
        name="surveyDescription"
        id="surveyDescription"
        class="h-11 w-1/2 ml-10 mt-10 border-2 rounded-lg"
        placeholder=" Enter a little description of Survey"
      />
    </div>

    <h1 class="text-3xl mt-4">Add Questions</h1>
    <div v-for="(data, index) in questions" :key="index">
      <input
        v-model="data.question"
        type="text"
        class="h-11 ml-10 w-3/4 border-2 rounded-lg mt-5"
        placeholder="A question usually ends with a question mark"
      />
      <button
        @click="addAnswers(index)"
        class="p-4 ml-4 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Add Answers
      </button>
      <div v-for="(answer, Index) in answers[index]" :key="Index">
        <input
          v-model="answer.option"
          type="text"
          class="h-11 ml-10 w-1/4 border-2 rounded-lg mt-5"
          placeholder="Enter your answer"
        />
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
export default {
  data() {
    return {
      questions: [{ question: '' }],
      answers: [[{ option: '' }]],
    };
  },
  components: {
    adminNav,
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
      for (let index = 0; index < this.questions.length; index++) {
        console.log(
          `Question is: ${this.questions[index].question} and Corresponding answers are ${this.answers[index][0]['option']}`
        );

        console.log('*****************************');
        console.log(this.answers);
      }
      fetch('/saveform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: this.questions,
          // password: this.formdata.password,
        }),
      }).then((res) => {
        if (res.status == '200') {
          router.push('/admin/dashboard');
        }
      });
    },
  },
};
</script>
