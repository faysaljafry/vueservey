<template>
  <div class="flex flex-col">
    <img
      src="../../../public/survey.jpeg"
      alt="The Company logo"
      class="h-52 w-52 self-center"
    />

    <form @submit.prevent="signIn" class="flex-col flex">
      <div class="form-group" :class="{ error: v$.form.email.$errors.length }">
        <input
          id="email"
          class="form-control h-16 mb-5 border-2 md:w-96 self-center p-3 rounded"
          v-model="v$.form.email.$model"
          for="email"
          type="email"
          required
          placeholder="Please Enter your Email"
        />
        <div
          class="input-errors"
          v-for="(error, index) of v$.form.email.$errors"
          :key="index"
        >
          <div class="error-msg text-xs text-red-600">{{ error.$message }}</div>
        </div>
      </div>
      <div class="form-group" :class="v$.form.password.$errors.length">
        <input
          id="password"
          class="h-16 mb-5 border-2 md:w-96 self-center p-3 rounded"
          v-model="v$.form.password.$model"
          for="password"
          type="password"
          required
          placeholder="Please Enter your Password"
        />
        <div
          class="input-errors"
          v-for="(error, index) of v$.form.password.$errors"
          :key="index"
        >
          <div class="error-msg text-xs text-red-600">{{ error.$message }}</div>
        </div>
      </div>

      <button
        :disabled="v$.form.$invalid"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-36 self-center"
        type="submit"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import router from '../../router/index';
import service from '../../services/service';
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      // isAuthenticated: false,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(6),
        },
      },
    };
  },
  methods: {
    async signIn() {
      const user = await service.userLogin({
        email: this.form.email,
        password: this.form.password,
      });
      if (user.user1.isAuthenticated) {
        router.push('/admin/dashboard');
      }
    },
  },
};
</script>

<style lang="sass" scoped></style>
