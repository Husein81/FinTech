import { User } from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    // Use req.params.id assuming the URL pattern is like /user/:id
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Respond with the user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
};
