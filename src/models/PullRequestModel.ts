import Commit from "./Commit";
import User from "./User";

class PullRequestModel{
    url!: string;
    id!: number;
    number!: number;
    state!: string;
    title!: string;
    user!: User;
    body!: string;
    created_at!: string;
    updated_at!: string;
    commits!: Commit[];
}