import api from "./client.js";
import { CrudApi } from "./CrudApi.js";

export const categoryApi = new CrudApi(api, "/api/categories");
