/** @format */
import Post from "../../../models/Post";
import connectDb from "../../../utils/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      let posts = await Post.find({}).sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "POST") {
    try {
      const post = await new Post(req.body);
      post.save();
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "PUT") {
    try {
      const post = await Post.findByIdAndUpdate(req.body._id, req.body);

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "DELETE") {
    try {
      const post = await Post.findByIdAndDelete(req.body._id);

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
export default connectDb(handler);
