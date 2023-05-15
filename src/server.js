//우리의 서버, 앱을 설정
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const PORT = 4001;

const app = express(); //epress application을 만들기
const logger = morgan("dev");
app.use(logger);

app.use("/", globalRouter); //라우터 쓰기
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); // app.lisen()으로 서버가 사람들이 뭔가를 요청할 때까지 기다리게 해야 된다.
