import UserModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "../model/Admin.js";

// User registration
export const register = async (req, res) => {
  try {
    // Hashing passsword
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const doc = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await doc.save();
    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create, Try again" });
  }
};

// User login
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const admin = await AdminModel.findOne({ email });

    if (admin) {
      // If user is exist then check the password or compare the password
      const checkCorrectPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );

      // If password is incorrect
      if (!checkCorrectPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect email or password" });
      }

      const { password, role, ...rest } = admin._doc;

      // Create jwt token
      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
      );

      // Set token in the browser cookies and send responce to the client
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          expires: token.expiresIn,
        })
        .status(200)
        .json({
          token,
          message: "Login successfull",
          data: { ...rest },
          role,
        });
    } else {
      const user = await UserModel.findOne({ email });

      // If user doesn't exist
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // If user is exist then check the password or compare the password
      const checkCorrectPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // If password is incorrect
      if (!checkCorrectPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect email or password" });
      }

      const { password, role, ...rest } = user._doc;

      // Create jwt token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
      );

      // Set token in the browser cookies and send responce to the client
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          expires: token.expiresIn,
        })
        .status(200)
        .json({
          token,
          message: "Login successfull",
          data: { ...rest },
          role,
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
