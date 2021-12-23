<template>
  <div>
    <adminnav></adminnav>
    <h1 class="mt-10 text-5xl">Active Surveys</h1>
    <div
      class="flex flex-col mt-11"
      v-for="(item, index) in Formdata"
      :key="index"
    >
      <!-- Modal to View Survey -->
      <div
        id="default-modal"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal h-96 md:h-full md:inset-0"
      >
        <div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600"
            >
              <h3
                class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
              >
                {{ modalData.title }}
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="default-modal"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <!-- Modal body -->
            <div
              class="p-6 space-y-6 overflow-y-auto"
              style="max-height: 500px"
            >
              <p
                class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
              >
                {{ modalData.description }}
              </p>
              <h1 class="text-3xl">Questions</h1>
              <div
                v-for="(question, index) in modalData.questions"
                :key="index"
              >
                <h1 class="text-left">Question Number: {{ index + 1 }}</h1>
                <p
                  class="text-base leading-relaxed text-black text-left dark:text-gray-400 mb-3"
                >
                  {{ question.question }}
                </p>

                <div
                  v-for="(answer, AnsIndex) in modalData.answers[index]"
                  :key="AnsIndex"
                >
                  <div v-for="(ans, nextindex) in answer" :key="nextindex">
                    <li class="text-black text-left">
                      {{ ans }}
                    </li>
                  </div>
                </div>
                <hr class="border-2 border-gray-400 rounded my-3" />
              </div>
            </div>
            <!-- Modal footer -->
            <div
              class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
            >
              <button
                data-modal-toggle="default-modal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-toggle="default-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
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
                type="button"
                @click="dummy(index)"
                data-modal-toggle="default-modal"
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
      <!-- This is the copied code -->

      <link
        rel="stylesheet"
        href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css"
      />

      <!-- Uptill here-->
    </div>
  </div>
</template>

<script>
import adminnav from './adminnav.vue';
import service from '../../services/service';
import router from '../../router/index';
import '@themesberg/flowbite';
// import '../../../node_modules/@themesberg/flowbite/dist/flowbite.bundle.js';
export default {
  data() {
    return {
      Formdata: [],
      modalData: {},
      FromToEdit: {},
    };
  },
  beforeMount() {
    if (!localStorage.getItem('user')) {
      router.push('/admin/login');
    }
  },
  created() {
    let ckeditor = document.createElement('script');
    ckeditor.setAttribute(
      'src',
      '//unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js'
    );
    document.head.appendChild(ckeditor);
  },
  mounted() {
    this.getForms();
  },
  components: {
    adminnav,
  },
  methods: {
    editForm(index) {
      this.FromToEdit = this.Formdata[index];
      this.$store.commit('setFormToEdit', index);
      router.push('/admin/editSurvey');
      console.log(this.FromToEdit);
    },
    deActivate(index) {
      this.Formdata[index].activated = false;
      console.log(this.Formdata[index].activated);
    },
    Activate(index) {
      this.Formdata[index].activated = true;
    },
    async getForms() {
      if (this.$store.getters.loadedFlag) {
        this.Formdata = this.$store.getters.getData;
      } else {
        const data = await service.getForms();
        console.log(data);
        this.Formdata = data.data;
        this.$store.commit('setData', this.Formdata);
      }
    },
    dummy(index) {
      console.log(this.Formdata[index]);
      this.modalData = this.Formdata[index];
      // toggleModal('default-modal');
    },
  },
};
</script>

<style></style>
