<template>
  <div>
    <adminnav></adminnav>
    <h1 class="mt-10 text-5xl">Active Surveys</h1>
    <div class="flex flex-col mt-11" v-for="item in 5" :key="item">
      <div class="bg-gray-200 h-60 w-2/3 rounded shadow-lg self-center">
        <div class="grid grid-flow-col p-3">
          <div class="grid-cols-6">
            <h1 class="text-3xl p-7 text-left">
              Cube Technologies Employee Feedback Form
            </h1>
            <h2 class="text-xl pl-7 pt-1 text-left">
              Cube Technologies is Working on the state of the art Development
              Techniques to develop State of the art Softwares and serve the
              national Benefits.
            </h2>
          </div>
          <div class="grid-cols-6">
            <div class="flex flex-col mt-5">
              <button
                class="p-4 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              >
                View
              </button>
              <button
                class="p-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Edit
              </button>
              <button
                class="p-4 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                De-activate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminnav from './adminnav.vue';
export default {
  data() {
    return {
      dummy1: {
        id: 'name',
        name: 'name',
        password: '',
      },
    };
  },
  components: {
    adminnav,
  },
  methods: {
    logout() {
      console.log('This will log the Admin out');
    },
  },
};
</script>

<style></style>
