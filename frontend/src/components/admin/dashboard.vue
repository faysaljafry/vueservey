<template>
  <div>
    <adminnav></adminnav>
    <h1 class="mt-10 text-5xl">Active Surveys</h1>
    <div
      class="flex flex-col mt-11"
      v-for="(item, index) in Formdata"
      :key="index"
    >
      <div class="bg-gray-200 h-auto w-2/3 rounded shadow-lg self-center">
        <div class="grid grid-flow-col p-3">
          <div class="col-start-1">
            <h1 class="text-3xl p-7 text-left">
              {{ item.title }}
            </h1>
            <h2 class="text-xl pl-7 pt-1 text-left">
              {{ item.description }}
            </h2>
          </div>
          <div class="col-start-9">
            <div class="flex flex-col mt-5">
              <button
                class="p-4 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              >
                View
              </button>
              <button
                @click="editForm(index)"
                class="p-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Edit
              </button>
              <button
                v-if="item.activated"
                @click="deActivate(index)"
                class="p-4 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                De-active
              </button>
              <button
                v-if="!item.activated"
                @click="Activate(index)"
                class="p-4 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Activate
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
import service from '../../services/service';
export default {
  data() {
    return {
      Formdata: [],
    };
  },
  beforeMount() {},

  mounted() {
    this.getForms();
  },
  components: {
    adminnav,
  },
  methods: {
    editForm() {},
    deActivate(index) {
      this.Formdata[index].activated = false;
      console.log(this.Formdata[index].activated);
    },
    Activate(index) {
      this.Formdata[index].activated = true;
    },
    logout() {
      console.log('This will log the Admin out');
    },
    async getForms() {
      const data = await service.getForms();
      console.log(data);
      this.Formdata = data.data;
      this.$store.commit('setData', this.Formdata);
    },
  },
};
</script>

<style></style>
