<template>
  <div class="flex flex-col">
    <img
      src="../../../public/survey.jpeg"
      alt="The Company logo"
      class="h-52 w-52 self-center"
    />
    <form @submit.prevent="signIn()" class="flex-col flex">
      <input
        id="email"
        class="h-16 mb-5 border-2 md:w-96 self-center p-3 rounded"
        v-model="formdata.email"
        for="email"
        type="email"
        required
        placeholder="Please Enter your Email"
      />
      <input
        id="password"
        class="h-16 mb-5 border-2 md:w-96 self-center p-3 rounded"
        v-model="formdata.password"
        for="password"
        type="password"
        required
        placeholder="Please Enter your Password"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-36 self-center"
        @click="signIn()"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import router from '../../router/index';
export default {
  data() {
    return {
      formdata: {
        email: '',
        password: '',
      },
      isAuthenticated: false,
    };
  },
  methods: {
    async signIn() {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.formdata.email,
          password: this.formdata.password,
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

<style lang="sass" scoped></style>
