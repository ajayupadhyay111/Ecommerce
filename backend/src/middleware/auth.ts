import { User } from "../models/user.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  console.log("id ",id)
  if (!id) {
    return res.status(400).json({ success: false, message: "Login first" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  if (user.role !== "admin") {
    return res
      .status(400)
      .json({ success: false, message: "Your are not eligible" });
  }

  next();
});
