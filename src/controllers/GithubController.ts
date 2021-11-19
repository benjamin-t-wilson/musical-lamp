import { Request, Response } from "express";
import PullRequestModel from "../models/PullRequestModel";
import * as GithubService from "../services/GithubService";

export const getAllPullRequests = async (req: Request, res: Response) => {
  const { username, repo } = req.params;
  const state: string = req.query.state ? req.query.state.toString() : "";

  const pullRequests: PullRequestModel[] = await GithubService.getPullRequests(
    username,
    repo,
    state
  );

  return res.status(200).json(pullRequests);
};
