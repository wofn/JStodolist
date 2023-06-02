export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "JStodolist";
  res.locals.loggedInUser = req.session.user;
  next();
};

//우리가 원하는 건, 로그인 하지 않은 사람들이 우리가 보호하려는 페이지에 가는걸 막는거다.
//→ 이걸 위해서 protectedMiddleware를 만들거다
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    //loggedIn은 유저가 로그인 할 때 session에 저장되는 정보, session에 저장 되었기 때문에 어느 controller나 미들웨어에서도 사용 가능
    return next();
  } else {
    return res.redirect("/login");
  }
};

//로그인 돼 있지 않은 사람들만 접근 할 수 있게하는 middleware도 만들어야 겠다.
//내가 로그인 했는데 다시 로그인 페이지로 갈 수 있으면 안 되기 때문

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
