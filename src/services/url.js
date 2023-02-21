export const apiBase = "http://127.0.0.1:8000/api";

export const url = {
  user: {
    register: apiBase + "/register",
    login: apiBase + "/login",
  },
  film: {
    get: apiBase + "/film",
    delete: apiBase + '/film/delete',
    create: apiBase + '/film/create',
    update: apiBase + '/film/update',
  }
}

export default url;
