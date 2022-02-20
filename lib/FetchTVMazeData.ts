import { HttpResponse, TVMazeRes } from './../models/types';

export async function FetchTVMazeData(url: string) {
  async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);
    response.parsedBody = await response.json();
    return response;
  }

  return http<TVMazeRes>(url).then(async data => {
    return data;
  });
}
