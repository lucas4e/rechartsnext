import { TVMazeRes } from './../_types';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponse } from '../_types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);
    response.parsedBody = await response.json();
    return response;
  }

  try {
    http<TVMazeRes>(req.body).then(async data => {
      return res.status(200).send(data.parsedBody);
    });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
}
