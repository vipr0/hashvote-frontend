import { getAuthToken } from "./cookies";
import superagent from "superagent";

export const apiUrl = process.env.REACT_APP_API_URL;

const withToken = (req) => {
  if (getAuthToken()) {
    req.set("Authorization", `Bearer ${getAuthToken()}`);
  }
};

const errorMessage = (error) => {
  throw Error(error.response.body.message);
};

export const request = {
  get: (route) =>
    superagent
      .get(`${apiUrl}/api/v1${route}`)
      .use(withToken)
      .catch(errorMessage),
  del: (route, data) =>
    superagent
      .del(`${apiUrl}/api/v1${route}`)
      .send(data)
      .use(withToken)
      .catch(errorMessage),
  post: (route, data) =>
    superagent
      .post(`${apiUrl}/api/v1${route}`)
      .send(data)
      .use(withToken)
      .catch(errorMessage),
  patch: (route, data) =>
    superagent
      .patch(`${apiUrl}/api/v1${route}`)
      .send(data)
      .use(withToken)
      .catch(errorMessage),
};

export const Profile = {
  get: async () => await request.get("/users/me"),
  changeData: async (body) => await request.patch("/users/me/data", body),
  changePassword: async (body) =>
    await request.patch("/users/me/password", body),
  login: async (body) => await request.post("/users/login", body),
  activate: async (token, body) =>
    await request.post(`/users/signup/${token}`, body),
  forgotPassword: async (body) => await request.post("/users/forgot", body),
  resetPassword: async (token, body) =>
    await request.post(`/users/reset/${token}`, body),
};

export const Voting = {
  getAll: async () => await request.get("/votings"),
  getOne: async (id) => await request.get(`/votings/${id}`),
  getResult: async (id) => await request.get(`/votings/${id}/contractinfo`),
  create: async (body) => await request.post(`/votings`, body),
  update: async (id, body) => await request.patch(`/votings/${id}`, body),
  start: async (id, body) => await request.post(`/votings/${id}/start`, body),
  archive: async (id) => await request.post(`/votings/${id}/archive`),
  delete: async (id) => await request.del(`/votings/${id}`),
  vote: async (id, body) => await request.post(`/votings/${id}`, body),
  addUsers: async (id, body) =>
    await request.post(`/votings/${id}/users`, body),
};

export const User = {
  getAll: async () => await request.get("/users"),
  getOne: async (id) => await request.get(`/users/${id}`),
  create: async (body) => await request.post(`/users`, body),
  import: async (body) => await request.post(`/users/upload`, body),
  update: async (id, body) => await request.patch(`/users/${id}`, body),
  deleteOne: async (id) => await request.del(`/users/${id}`),
  deleteMany: async (body) => await request.del(`/users`, body),
};
