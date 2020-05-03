import { getAuthToken } from "./cookies";

class API {
  constructor() {
    // this.url = "http://64.227.124.43:3000";
    this.url = "http://127.0.0.1:8080";
  }

  addKeys(arr) {
    return arr.map((value, i) => (value.key = i));
  }

  async createRequest(route, parameters = {}) {
    const res = await fetch(`${this.url}/api/v1${route}`, {
      method: parameters.method || "GET",
      headers: {
        Authorization: !parameters.authorized
          ? `Bearer ${getAuthToken()}`
          : null,
        "Content-Type": parameters.contentType || "application/json",
      },
      body: JSON.stringify(parameters.data) || null,
    });

    const json = await res.json();
    if (json.status === "error") throw new Error(json.message);
    // if (json.result.length) json.result = this.addKeys(json.result);
    return json;
  }

  // ====================================
  // USERS
  // ====================================

  async createUser(data) {
    return await this.createRequest(`/users`, { method: "POST", data });
  }

  async getUsers() {
    return await this.createRequest("/users");
  }

  async getUser(id) {
    return await this.createRequest(`/users/${id}`);
  }

  async updateUser(id, data) {
    return await this.createRequest(`/users/${id}`, { method: "PATCH", data });
  }

  async deleteUser(id) {
    await this.createRequest(`/users/${id}`, { method: "DELETE" });
  }

  // ====================================
  // OWN ACCOUNT
  // ====================================

  async getMe() {
    return await this.createRequest("/users/me");
  }

  async updateMe(data, type) {
    return await this.createRequest(`/users/me/${type}`, {
      method: "PATCH",
      data,
    });
  }

  async uploadPhoto(photo) {
    return await this.createRequest("/users/me/data", {
      method: "PATCH",
      contentType: "multipart/form-data",
      data: photo,
    });
  }

  // ====================================
  // VOTING
  // ====================================

  async getVotings() {
    return await this.createRequest("/votings");
  }

  async getVotingDB(id) {
    return await this.createRequest(`/votings/${id}`);
  }

  async getVotingContract(id) {
    return await this.createRequest(`/votings/${id}/contractinfo`);
  }

  async voteForCandidate(votingID, data) {
    return await this.createRequest(`/votings/${votingID}`, {
      method: "POST",
      data,
    });
  }

  async createVoting(data) {
    return await this.createRequest("/votings", { method: "PATCH", data });
  }

  async updateVoting(id, data) {
    return await this.createRequest(`/votings/${id}`, {
      method: "PATCH",
      data,
    });
  }

  async archiveVoting(id) {
    return await this.createRequest(`/votings/${id}/archive`, {
      method: "POST",
    });
  }

  async deleteVoting(id) {
    await this.createRequest(`/votings/${id}`, { method: "DELETE" });
  }

  async addUsersToVoting(id, file) {
    return await this.createRequest(`votings/${id}/users`, {
      method: "POST",
      contentType: "multipart/form-data",
      data: file,
    });
  }

  async startVoting(votingID, data) {
    return await this.createRequest(`/votings/${votingID}/start`, {
      method: "POST",
      data,
    });
  }

  // ====================================
  // AUTHETICATION
  // ====================================

  async login(data) {
    return await this.createRequest("/users/login", {
      method: "POST",
      data,
      authorized: false,
    });
  }

  async finishRegister(token, data) {
    return await this.createRequest(`/users/signup/${token}`, {
      method: "POST",
      data,
      authorized: false,
    });
  }

  async forgotPassword(data) {
    return await this.createRequest(`/users/forgot`, {
      method: "POST",
      data,
      authorized: false,
    });
  }

  async resetPassword(token, data) {
    return await this.createRequest(`/users/reset/${token}`, {
      method: "POST",
      data,
      authorized: false,
    });
  }
}

export default new API();
