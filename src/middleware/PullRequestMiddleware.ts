import axios, { AxiosResponse } from "axios";
import { Request, Response, NextFunction } from "express";

export async function isRouteValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, repo } = req.params;

  if (!username || !repo) {
    return res
      .status(400)
      .json({ message: "Must provide username and repo name" });
  }
  const baseUrl: string = "https://api.github.com/repos/";
  const httpClient = axios.create({ baseURL: baseUrl });
  const pullRequestBaseUrl: string = `/${username}/${repo}/pulls`;

  try {
    await httpClient.get(pullRequestBaseUrl);
  } catch (error: any) {
    return res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }

  next();
}
