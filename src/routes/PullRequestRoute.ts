import express from "express";
import * as GithubController from "../controllers/GithubController";
const router = express.Router();

router.get(
  "/:username/:repo",
  GithubController.getAllPullRequests
);

export default router;
