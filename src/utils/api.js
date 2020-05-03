import { getAuthToken } from "./cookies";
import { v4 as uuidv4 } from "uuid";

class API {
  constructor() {
    // this.url = "http://64.227.124.43:3000";
    this.url = "http://127.0.0.1:8080";
  }

  addUniqueKeys(arr) {
    return arr.map((elem) => ({ ...elem, key: uuidv4() }));
  }

  async createRequest(route, parameters = {}) {
    const defaultParameters = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: null,
    };

    const res = await fetch(`${this.url}/api/v1${route}`, {
      ...defaultParameters,
      ...parameters,
    });

    if (res.status === 204) return null;

    let json = await res.json();
    if (json.status === "error") throw new Error(json.message);
    if (json.result && json.result.length)
      json.result = this.addUniqueKeys(json.result);
    return json;
  }

  // ====================================
  // USERS
  // ====================================

  async createUser(body) {
    return await this.createRequest(`/users`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async getUsers() {
    return await this.createRequest("/users");
  }

  async getUser(id) {
    return await this.createRequest(`/users/${id}`);
  }

  async updateUser(id, body) {
    return await this.createRequest(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
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

  async changeProfileData(body) {
    return await this.createRequest(`/users/me/data`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      body,
    });
  }

  async changeProfilePassword(body) {
    return await this.createRequest(`/users/me/password`, {
      method: "PATCH",
      body: JSON.stringify(body),
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

  async voteForCandidate(votingID, body) {
    return await this.createRequest(`/votings/${votingID}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async createVoting(body) {
    return await this.createRequest("/votings", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async updateVoting(id, body) {
    return await this.createRequest(`/votings/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
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

  async addUsersToVoting(id, body) {
    return await this.createRequest(`votings/${id}/users`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getAuthToken()}` },
      body,
    });
  }

  async startVoting(votingID, body) {
    return await this.createRequest(`/votings/${votingID}/start`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  // ====================================
  // AUTHETICATION
  // ====================================

  async login(body) {
    return await this.createRequest("/users/login", {
      method: "POST",
      headers: {},
      body: JSON.stringify(body),
    });
  }

  async finishRegister(token, body) {
    return await this.createRequest(`/users/signup/${token}`, {
      method: "POST",
      headers: {},
      body: JSON.stringify(body),
    });
  }

  async forgotPassword(body) {
    return await this.createRequest(`/users/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  async resetPassword(token, body) {
    return await this.createRequest(`/users/reset/${token}`, {
      method: "POST",
      headers: {},
      body: JSON.stringify(body),
    });
  }
}

export default new API();
