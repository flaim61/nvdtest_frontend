<template>
  <div class="border rounded p-3" v-if='!this.loginSuccessed'>
    <h3 class='mb-4'>
      Войти
    </h3>
    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input v-model="form.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Введите email">
    </div>
    <div class="error" v-if="this.errors.email.length">
      {{this.errors.email}}
    </div>

    <div class="form-group">
      <label for="exampleInputPassword1">Пароль</label>
      <input v-model="form.password" type="password" class="form-control" placeholder="Введите пароль">
    </div>
    <div class="error" v-if="this.errors.password.length">
      {{this.errors.password}}
    </div>

    <button type="submit" class="btn btn-primary" v-on:click="submitLogin">Войти</button>
  </div>
</template>

<script>
  import { login } from '@/services/Config.js';

  export default {
    name: 'Login',
    components: {},
    data(){
      let form = {
        email: '',
        password: '',
      };
      let errors = {
        email: '',
        password: '',
      }

      return {
        form,
        errors,
        loginSuccessed: false
      }
    },
    methods:{
      async submitLogin(e) {
        e.preventDefault()
        try {
          const res = await login(this.form);

          if(res.data.status === "success"){
            document.cookie = "token="+res.data.authorization.token;
            location.reload();
          }
        } catch (e) {
          if(e.response.status === 422){
            if (e.response.data.errors.email) {
              this.errors.email = e.response.data.errors.email[0];
            }
            if (e.response.data.errors.password) {
              this.errors.password = e.response.data.errors.password[0];
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
