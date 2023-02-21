import { url, apiBase } from '@/services/url.js'
import axios from "axios"


const $api = axios.create({
    withCredentials: false,
    baseURL: apiBase
})

$api.interceptors.request.use(
  (config) => {
    let token = readCookie('token');

    if (token) {
      config.headers['Authorization'] = `${ token }`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const register = async function (data) {
    return await $api.post(url.user.register, data);
}

export const login = async function (data) {
    return await $api.post(url.user.login, data);
}

export const getFilms = async function () {
    return await $api.get(url.film.get);
}

export const deleteFilm = async function (data) {
    return await $api.post(url.film.delete, data);
}

export const createFilm = async function (data) {
    return await $api.post(url.film.create, data);
}

export const updateFilm = async function (data) {
    return await $api.post(url.film.update, data);
}

export const isLoggedIn = function() {
    return (readCookie('token') != null != 0 && readCookie('token').lenght != 0 );
}

function readCookie(name) {
	let name_cook = name+"=";
	let spl = document.cookie.split(";");

	for(let i = 0; i < spl.length; i++) {
		let c = spl[i];

		while(c.charAt(0) == " ") {
			c = c.substring(1, c.length);
		}

		if(c.indexOf(name_cook) == 0) {
			return c.substring(name_cook.length, c.length);
		}
	}

	return null;
}
