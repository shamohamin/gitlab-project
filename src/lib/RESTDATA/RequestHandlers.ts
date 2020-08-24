import Axios from "axios";

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface IRequestHandler {
  getRequest: (_params: any, headers: any) => any;
  postRequest: (_params: any, postData: any, header: any) => any;
}

export class RequestHandler implements IRequestHandler {
  private URL: string;
  constructor(url: string) {
    this.URL = url;
  }

  getRequest = async (_params = {}, headers?: any) => {
    try {
      const data = await this.request(
        Methods.GET,
        this.URL,
        _params,
        {},
        headers
      );
      return data;
    } catch (ex) {
      console.log("error occure during fetch data", ex);
      throw new Error(ex);
    }
  };

  postRequest = async (_params = {}, postData = {}, header?: any) => {
    try {
      const data = await this.request(
        Methods.POST,
        this.URL,
        _params,
        postData,
        header
      );
      return data;
    } catch (ex) {
      console.log("error while fetching data", ex);
      throw new Error(ex);
    }
  };

  private request = async (
    method: Methods,
    url: string,
    params?: any,
    data?: any,
    headers?: any
  ) =>
    Axios.request({
      url,
      method,
      params,
      data,
      headers,
    });
}
