import express from "express";
import * as GithubController from "../controllers/GithubController";
import {
  isRouteValid,
  isStateValid,
} from "../middleware/PullRequestMiddleware";

const router = express.Router();

router.get(
  "/:username/:repo",
  isRouteValid,
  isStateValid,
  GithubController.getAllPullRequests
);

export default router;
