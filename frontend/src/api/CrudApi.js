export class CrudApi {
  constructor(http, resourcePath) {
    this.http = http;
    this.resourcePath = resourcePath;
  }

  async getAll() {
    const { data } = await this.http.get(this.resourcePath);
    return data;
  }

  async getById(id) {
    const { data } = await this.http.get(`${this.resourcePath}/${id}`);
    return data;
  }

  async create(item) {
    const { data } = await this.http.post(this.resourcePath, item);
    return data;
  }

  async update(id, item) {
    const { data } = await this.http.put(`${this.resourcePath}/${id}`, item);
    return data;
  }

  async remove(id) {
    await this.http.delete(`${this.resourcePath}/${id}`);
  }
}
