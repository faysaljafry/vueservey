<template>
  <div>
    <admin-nav></admin-nav>
    <div class="bg-gray-500">
      This is The component Where The System to create the Survey will be
      Displayed.
    </div>

    <div class="flex flex-col">
      <h1 class="text-3xl text-red-800">Fill The Survey Information</h1>
      <input
        type="text"
        name="surveyTitle"
        id="surveyTitle"
        class="h-11 w-1/2 ml-10 mt-10 border-2 rounded-lg"
        placeholder="Enter the Title of Survey"
      />
      <input
        type="text"
        name="surveyDescription"
        id="surveyDescription"
        class="h-11 w-1/2 ml-10 mt-10 border-2 rounded-lg"
        placeholder="Enter a little description of Survey"
      />
    </div>
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
          v-model="answer[Index]"
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
  </div>
</template>

<script>
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
  },
};
</script>
