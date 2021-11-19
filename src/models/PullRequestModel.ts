import CommitModel from "./CommitModel";
import UserModel from "./UserModel";

class PullRequestModel {
  url!: string;
  id!: number;
  number!: number;
  state!: string;
  title!: string;
  user!: UserModel;
  body!: string;
  created_at!: string;
  updated_at!: string;
  commits!: CommitModel[];
}

export default PullRequestModel;
