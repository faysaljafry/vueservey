<template>
  <div>
    <admin-nav></admin-nav>
    <h1 class="text-3xl text-red-800">Fill The Survey Information</h1>
    <div class="flex flex-row gap-5 p-5">
      <input
        type="text"
        v-model="editabledata.title"
        name="surveyTitle"
        id="surveyTitle"
        class="h-11 w-1/2 p-5 mt-10 border-2 rounded-lg"
        placeholder=" Enter the Title of Survey"
      />
      <input
        type="text"
        v-model="editabledata.description"
        name="surveyDescription"
        id="surveyDescription"
        class="h-11 w-1/2 p-5 mt-10 border-2 rounded-lg"
        placeholder=" Enter a little description of Survey"
      />
    </div>

    <h1 class="text-3xl mt-4">Add Questions</h1>
    <div v-for="(data, index) in editabledata.questions" :key="index">
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
        <div
          v-for="(answer, Index) in editabledata.answers[index]"
          :key="Index"
        >
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
import service from '../../services/service';
require('dotenv').config();
export default {
  data() {
    return {
      editabledata: {},
      url: 'http://localhost:3000',
    };
  },
  components: {
    adminNav,
  },

  beforeMount() {
    if (!localStorage.getItem('user')) {
      router.push('/admin/login');
    } else {
      this.editabledata = this.$store.getters.getForTOEdit;
    }
  },
  methods: {
    addAnswers(index) {
      console.log(this.editabledata);
      //   console.log('The answer Function');
      this.editabledata.answers[index].push({
        option: '',
      });
    },
    addQuestion() {
      console.log(this.questions);
      this.editabledata.questions.push({
        question: '',
      });
      this.editabledata.answers.push([{ option: '' }]);
    },
    async saveForm() {
      // console.log('Form Saved');
      // console.log(this.editabledata);
      this.$store.commit('updateSurvey', this.editabledata);
      await service.updateSurvey(this.editabledata);
      // console.log(response);
      router.push('/admin/dashboard');
    },
  },
};
</script>
