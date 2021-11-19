import express from "express";
import * as GithubController from "../controllers/GithubController";
import { isRouteValid } from "../middleware/PullRequestMiddleware";

const router = express.Router();

router.get(
  "/:username/:repo",
  isRouteValid,
  GithubController.getAllPullRequests
);

export default router;
