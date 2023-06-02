import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";

import { protectorMiddleware } from "../middlewares";
import { publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(publicOnlyMiddleware).get(getEdit).post(postEdit);
//이것은 get, post등 어떤 http method를 사용하든지 이 middleware를 사용하겠다는 의미
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
//publicOnly는 로그아웃 돼 있어야 실행시키는 걸 허락, 로그인 되어 있으면 들어오는 것을 막아준다.
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin); //이 url을 github.com 웹사이트에 만들었다.

export default userRouter;
