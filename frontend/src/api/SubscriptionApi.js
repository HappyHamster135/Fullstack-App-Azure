import api from "./client.js";
import { CrudApi } from "./CrudApi.js";

class SubscriptionApi extends CrudApi {
  constructor(http) {
    super(http, "/api/subscriptions");
  }

  async registerPayment(subscriptionId, payment) {
    const { data } = await this.http.post(
      `${this.resourcePath}/${subscriptionId}/payments`,
      payment,
    );
    return data;
  }
}

export const subscriptionApi = new SubscriptionApi(api);
