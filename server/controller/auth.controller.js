import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// export const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fileds are required",
//       });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be at least 6 characters",
//       });
//     }

//     const user = await Admin.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: "You already have an account",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new Admin({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     const token = generatToken(newUser);

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       secure: true,
//       sameSite: "None",
//     });

//     await newUser.save();

//     return res.status(201).json({
//       success: true,
//       message:
//         "Account created. Please verify your account with the OTP send to your email",
//       user: {
//         _id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("eroor message", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = Admin.create({
        email,
        password: hashedPassword,
      });

      const token = generateToken(newUser);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "None",
        });

      return res.status(201).json({
        success: true,
        message:"Account created successfully",
         user: {
          _id: newUser._id,
          email: newUser.email,
        },
      })
    } 

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      return res.status(400).json({
        message: "Wrong email or password",
      });
    }
    let token = generateToken(user);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome back`,
        user: {
          _id: user._id,
          email: user.email,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getAdminProfile = async (req, res) => {
   try {
      const adminId = req.admin;
      console.log("Admin ID from token:", adminId);
      const admin = await Admin.findById(adminId);
      if (!admin) {
         return res.status(404).json({
            success: false,
            message: "Admin not found",
         });
      }
      return res.status(200).json({
         success: true,
         admin,
      });
   } catch (error) {
      console.error("Get admin profile error:", error);
      return res.status(500).json({
         success: false,
         message: "Internal server error", 
      });
   }
};