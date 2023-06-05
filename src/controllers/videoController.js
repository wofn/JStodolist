import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
  let videos = [];
  if (req.session.loggedIn) {
    const user = await User.findById(req.session.user._id);
    videos = await Video.find({ user_email: user.email }).sort({
      createdAt: "desc",
    });
  }
  return res.render("home", { pageTitle: "To Do List", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "to do를 찾을 수 없습니다." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("404", { pageTitle: "to do를 찾을 수 없습니다." });
  }
  return res.render("edit", { pageTitle: `${video.title} 수정 중`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params; //route로 부터 id를 얻어와서
  const { title, description } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res
      .status(404)
      .render("404", { pageTitle: "to do를 찾을 수 없습니다." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "할 일 추가" });
};

export const postUpload = async (req, res) => {
  const { title, description } = req.body;
  try {
    await Video.create({
      title,
      description,
      user_email: req.session.user.email,
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "할 일 추가",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

/*
res.render.end() 연결 종료
res.redirect() 브라우저가 redirect(자동으로 이동)하도록 하는거다.
*/
