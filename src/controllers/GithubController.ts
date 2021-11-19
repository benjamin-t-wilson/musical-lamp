import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import * as GithubService from "../services/GithubService";

export const getAllPullRequests = async (req: Request, res: Response) => {
  const { username, repo } = req.params;

  if (!username || !repo) {
    return res
      .status(400)
      .json({ message: "Must provide username and repo name" });
  }

  const pullRequests = await GithubService.getPullRequests(username, repo);

  return res.status(200).json(pullRequests);
};
