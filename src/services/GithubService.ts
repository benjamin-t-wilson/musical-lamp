import axios, { AxiosInstance, AxiosResponse } from "axios";
import CommitModel from "../models/CommitModel";
import PullRequestModel from "../models/PullRequestModel";
import UserModel from "../models/UserModel";

const baseUrl: string = "https://api.github.com/repos/";
const httpClient: AxiosInstance = axios.create({ baseURL: baseUrl });

export async function getPullRequests(
  username: string,
  repo: string,
  state: string = ""
): Promise<PullRequestModel[]> {
  const pullRequestBaseUrl: string = `/${username}/${repo}/pulls`;
  const stateModifier: string = state ? `?state=${state}` : "";

  const pullRequestsResponse: AxiosResponse = await httpClient.get(
    pullRequestBaseUrl + stateModifier
  );

  const pullRequests: PullRequestModel[] = pullRequestsResponse.data.map(
    async (pullRequest: any) => {
      const newPullRequest: PullRequestModel = new PullRequestModel();

      // I tend to prefer these sort of attribute blocks
      // over constructors with long argument lists.
      // but AutoMapper in C# is definitely cooler than both
      newPullRequest.id = pullRequest.id;
      newPullRequest.url = pullRequest.url;
      newPullRequest.number = pullRequest.number;
      newPullRequest.state = pullRequest.state;
      newPullRequest.title = pullRequest.title;
      newPullRequest.body = pullRequest.body;
      newPullRequest.created_at = pullRequest.created_at;
      newPullRequest.updated_at = pullRequest.updated_at;

      newPullRequest.user = new UserModel();
      newPullRequest.user.login = pullRequest.user.login;
      newPullRequest.user.avatar_url = pullRequest.user.avatar_url;
      newPullRequest.user.url = pullRequest.user.url;

      // Might be worth abstracting the getting of commits to another method
      // if this was a bigger application
      const commitsResponse = await httpClient.get(
        pullRequestBaseUrl + `/${pullRequest.number}/commits`
      );

      newPullRequest.commits = commitsResponse.data.map((commit: any) => {
        const newCommit = new CommitModel();
        newCommit.url = commit.url;
        newCommit.name = commit.commit.committer.name;
        newCommit.email = commit.commit.committer.email;
        newCommit.message = commit.commit.message;

        return newCommit;
      });

      return newPullRequest;
    }
  );

  return Promise.all(pullRequests);
}
