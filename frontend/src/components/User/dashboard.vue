<template>
  <div>
    <user-nav></user-nav>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal">
        <div class="fixed inset-0 z-40 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <DialogTitle
                  as="h3"
                  class="text-3xl font-medium leading-6 text-gray-900"
                >
                  {{ modalData.title }}
                </DialogTitle>
                <div class="mt-2">
                  <p
                    class="text-base leading-relaxed text-yellow-600 dark:text-gray-400"
                  >
                    {{ modalData.description }}
                  </p>
                  <h1 class="text-2xl">Questions</h1>
                  <div
                    v-for="(question, index) in modalData.questions"
                    :key="index"
                  >
                    <h1 class="text-left">Question Number: {{ index + 1 }}</h1>
                    <p
                      class="text-base leading-relaxed text-green-600 text-left dark:text-gray-400 mb-3"
                    >
                      {{ question.question }}
                    </p>

                    <div
                      v-for="(answer, AnsIndex) in modalData.answers[index]"
                      :key="AnsIndex"
                    >
                      <div v-for="(ans, nextindex) in answer" :key="nextindex">
                        <!-- <li class="text-red-700 text-left">
                          {{ ans }}
                        </li> -->
                        <input
                          :id="ans"
                          v-model="checked[index]"
                          type="radio"
                          :value="AnsIndex + 1"
                          @change="onChange"
                        />
                        <label class="p-4" :for="ans">
                          {{ ans }}
                          <!-- <span class="p-4" :for="ans">{{ ans }}</span> -->
                        </label>
                      </div>
                    </div>
                    <hr class="border-2 border-gray-400 rounded my-3" />
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    @click="closeModal"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
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
                type="button"
                @click="openModal(index)"
                data-modal-toggle="default-modal"
                class="p-4 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Fill Survey
              </button>
              <!-- <button
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
              </button> -->
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

      <!-- Uptill here-->
    </div>
  </div>
</template>

<script>
import router from '../../router/index';
import userNav from './usernav.vue';
import service from '../../services/service';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';
export default {
  data() {
    return {
      checked: [],
      isOpen: false,
      Formdata: [],
      filledIndex: null,
      filledSurvey: [],
    };
  },
  beforeMount() {
    if (!localStorage.getItem('user')) {
      router.push('/login');
    }
    this.Formdata = this.$store.getters.getData;
    this.getFilledSurveys();
    // console.log(this.Formdata);
  },
  mounted() {
    this.getForms();

    //this.test1();
    // console.log(this.Formdata);
    /**
     * This is Testing on The difference
     */
  },
  updated() {
    this.test1();
    console.log(this.filledSurvey);
    console.log(this.Formdata);
  },
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    userNav,
  },
  methods: {
    openModal(index) {
      // console.log(this.Formdata[index]);
      this.modalData = this.Formdata[index];
      this.filledIndex = index;
      this.isOpen = true;
    },
    closeModal() {
      let email = JSON.parse(localStorage.getItem('user')).user1.email;
      this.isOpen = false;
      this.editIndex = null;
      console.log(this.checked);
      let filledForm = {
        id: this.Formdata[this.filledIndex]._id,
        filled: true,
        checked: this.checked,
        email,
      };
      const response = service.saveFeedback(filledForm);
      this.filledIndex = null;
      this.filledSurvey.push(filledForm);
      console.log(response);
    },
    async getForms() {
      if (this.$store.getters.loadedFlag) {
        this.Formdata = this.$store.getters.getData;
      } else {
        const data = await service.getForms();
        // console.log(data);
        this.Formdata = data.data;
        this.$store.commit('setData', this.Formdata);
      }
    },
    async getFilledSurveys() {
      let FilledSurvey = await service.getFilledSurveys();
      this.filledSurvey = FilledSurvey.data;
      //console.log(FilledSurvey.data[0]);
    },
    test1() {
      console.log('Testing function starts');
      const isSameUser = (a, b) => a._id === b.id;
      const onlyInLeft = (left, right, compareFunction) =>
        left.filter(
          (leftValue) =>
            !right.some((rightValue) => compareFunction(leftValue, rightValue))
        );

      console.log(this.Formdata);
      const onlyInA = onlyInLeft(this.Formdata, this.filledSurvey, isSameUser);
      //   const onlyInB = onlyInLeft(this.filledSurvey, this.Formdata, isSameUser);

      //   const result = ];
      this.Formdata = onlyInA;
      console.log('Different Function is', JSON.parse(JSON.stringify(onlyInA)));
    },
  },
};
</script>
