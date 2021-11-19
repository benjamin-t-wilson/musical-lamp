import { Request, Response } from "express";
import * as GithubService from "../services/GithubService";

export const getAllPullRequests = async (req: Request, res: Response) => {
  const { username, repo } = req.params;

  const pullRequests = await GithubService.getPullRequests(username, repo);

  return res.status(200).json(pullRequests);
};
