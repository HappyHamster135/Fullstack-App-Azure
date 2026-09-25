import api from "./client.js";

class DashboardApi {
  constructor(http) {
    this.http = http;
  }

  async getSummary() {
    const { data } = await this.http.get("/api/dashboard");
    return data;
  }
}

export const dashboardApi = new DashboardApi(api);
