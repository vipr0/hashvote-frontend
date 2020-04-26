import Cookies from "js-cookie";

class API {
  constructor() {
    this.url = "http://127.0.0.1:8080";
    this.token = Cookies.get("jwt");
    this.me = Cookies.get("user");
  }

  async createRequest(route, method = "GET", data = null, authorized = true) {
    const res = await fetch(`${this.url}/api/v1${route}`, {
      method,
      headers: {
        Authorization: authorized ? `Bearer ${this.token}` : null,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
  }

  async getMe() {
    const json = await this.createRequest("/users/me");
    return json.result;
  }

  async updateMe(data, type) {
    const json = await this.createRequest(`/users/me/${type}`, "PATCH", data);
    return json.message;
  }

  async uploadPhoto(photo) {
    const res = await fetch(`${this.url}/api/v1/users/me/data`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${this.token}` },
      body: photo
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
  }

  async getVotings() {
    const json = await this.createRequest("/votings");
    json.result.map((voting, i) => (voting.key = i));
    return json.result;
  }

  async getVotingDB(id) {
    const json = await this.createRequest(`/votings/${id}`);
    return json.result;
  }

  async getVotingContract(id) {
    const json = await this.createRequest(`/votings/${id}/contractinfo`);
    return json.result;
  }

  async getUsers() {
    const json = await this.createRequest("/users");
    json.result.map((user, i) => (user.key = i));
    return json.result;
  }

  async getGroups() {
    const json = await this.createRequest("/groups");
    json.result.map((group, i) => (group.key = i));
    return json.result;
  }

  async login(values) {
    const json = await this.createRequest(
      "/users/login",
      "POST",
      values,
      false
    );
    Cookies.set("jwt", json.token);
    Cookies.set("user", json.data.user);
  }

  async logout() {
    Cookies.remove("jwt");
    Cookies.remove("user");
  }

  async voteForCandidate(votingID, data) {
    const json = await this.createRequest(`/votings/${votingID}`, "POST", data);
    return json;
  }

  async createVoting(data) {
    const json = await this.createRequest("/votings", "POST", data);
    return json;
  }

  getUser() {
    return Cookies.getJSON("user");
  }
}

export default new API();
