<template>
  <div class="border rounded p-3" v-if='!this.registerSuccessed'>
    <h3 class='mb-4'>
      Зарегистрироваться
    </h3>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input v-model="form.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Введите email">
    </div>
    <div class="error" v-if="this.errors.email.length">
      {{this.errors.email}}
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Имя</label>
      <input v-model="form.name" type="text" class="form-control" placeholder="Введите пароль">
    </div>
    <div class="error" v-if="this.errors.name.length">
      {{this.errors.name}}
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Пароль</label>
      <input v-model="form.password" type="password" class="form-control" placeholder="Введите пароль">
    </div>
    <div class="error" v-if="this.errors.password.length">
      {{this.errors.password}}
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Подтверждение пароля</label>
      <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Введите пароль">
    </div>
    <div class="error" v-if="this.errors.password_confirmation.length">
      {{this.errors.password_confirmation}}
    </div>

    <button type="submit" class="btn btn-primary" v-on:click="submitLogin">Создать аккаунт</button>
  </div>
  <div class="border rounded p-3 text-center" v-if='this.registerSuccessed'>
    Вы успешно зарегистрировались! Теперь вы можете авторизоваться!
  </div>
</template>

<script>
  import { register } from '@/services/Config.js';

  export default {
    name: 'Register',
    components: {},
    data(){
      let form = {
        email: '',
        password: '',
        password_confirmation: '',
        name: ''
      };
      let errors = {
        email: '',
        password: '',
        password_confirmation: '',
        name: ''
      }

      return {
        form,
        errors,
        registerSuccessed: false
      }
    },
    methods:{
      async submitLogin(e) {
        e.preventDefault()
        try {
          const res = await register(this.form);

          if(res.data.status === "success"){
            this.registerSuccessed = true;
          }

        } catch (e) {
          if(e.response.status === 422){
            if (e.response.data.errors.email) {
              this.errors.email = e.response.data.errors.email;
            }
            if (e.response.data.errors.name) {
              this.errors.name = e.response.data.errors.name;
            }
            if (e.response.data.errors.password) {
              this.errors.password = e.response.data.errors.password;
            }
            if (e.response.data.errors.password_confirmation) {
              this.errors.email = e.response.data.errors.password_confirmation;
            }
          }
        }
      },
    }
  }
</script>

<style lang="css" scoped>
  .error{
    color: red;
  }
</style>
