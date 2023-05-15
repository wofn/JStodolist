export const trending = (req, res) => res.send("home page videos");
export const see = (req, res) => {
  res.send(`see #${req.params.id}`);
};
export const edit = (req, res) => res.send("Edit video");
export const search = (req, res) => res.send("search");
export const upload = (req, res) => res.send("upload video");
export const deleteVideo = (req, res) => res.send("delete Video");
