<template>
  <div class="container" v-if='!this.isLoggedIn'>
    <div class="row pt-5">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <Login/>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <Register/>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="text-center p-5" v-if='this.downloadFilmsError'>
      <h3>
        Произошла ошибка загрузки фильмов
      </h3>
    </div>
  </div>

  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Описание</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(film, index) in this.films" :key="index">
          <th scope="row">{{film.id}}</th>
          <td>
            <span v-if='!isLoggedIn'>{{film.name}}</span>
            <span v-if='isLoggedIn'><input v-model="films[index].name" type="text" name=""></span>
          </td>
          <td>
            <span v-if='!isLoggedIn'>{{film.description}}</span>
            <span v-if='isLoggedIn'><input v-model="films[index].description" type="text" name=""></span>
          </td>
          <td v-if='!this.isLoggedIn'>Действия доступны только авторизованным пользователям</td>
          <td v-if='this.isLoggedIn'>
            <button type="submit" class="btn btn-danger" v-on:click.prevent="deleteFilm(film.id)">Удалить</button>
            <button type="submit" class="btn btn-warning ml-4" v-on:click.prevent="updateFilm(film.id)">Обновить</button>
            <div v-if='film.successUpdated != undefined' class='color-sucess'>
              Обновление фильма прошло успешно!
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="container">
    <div class="border rounded" v-if='this.isLoggedIn'>
      <div class="p-5">
        <h3>
          Добавить новый фильм
        </h3>

        <div class="form-group">
          <label for="exampleInputEmail1">Название</label>
          <input v-model="newFilm.name" class="form-control" type="text" required>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Описание</label>
          <input v-model="newFilm.description" class="form-control" type="text" required>
        </div>
        <button class="btn btn-primary" v-on:click.prevent="createFilm()">Добавить</button>
      </div>

    </div>
  </div>
</template>


<script>
  import Login from '@/components/Login.vue'
  import Register from '@/components/Register.vue'
  import {mapGetters} from 'vuex'
  import {
    isLoggedIn,
    getFilms,
    deleteFilm,
    createFilm,
    updateFilm
  } from '@/services/Config.js';


  export default {
    name: "Home",
    components: {
      Login,
      Register
    },
    data(){
      let newFilm = {
        name: "",
        description: ""
      }

      return {
        newFilm,
        isLoggedIn: isLoggedIn(),
        films: [],
        downloadFilmsError: false
      }
    },
    async created(){
      this.films = await this.getFilms();
    },
    methods: {
      async updateFilm(film_id){
        const film = this.films.find(film => film.id === film_id);

        try {
          const res = await updateFilm(film);

          if (res.data.status === "success") {
            this.films.find(film => film.id === film_id).successUpdated = true;
          }
        } catch (e) {
          console.log(e)
        }

      },
      async getFilms(){
        try {
          const res = await getFilms();

          if (res.data.status === 'success') {
              return res.data.data;
          }
        } catch (e) {
          this.downloadFilmsError = true;
        }
      },
      async createFilm(){
        try {
          const res = await createFilm(this.newFilm);

          if (res.data.status === "success") {
            this.films.push({
              id: res.data.data.id,
              name: res.data.data.name,
              description : res.data.data.description
            })
          }
        } catch (e) {
          console.log(e)
        }
      },
      async deleteFilm(film_id){
        try {
          const res = await deleteFilm({
            id: film_id
          });

          if (res.data.status === 'success') {
              this.films = this.films.filter(film => film.id != film_id);
          }
        } catch (e) {
          console.log(e)
        } finally {

        }
      }
    }
  }
</script>
