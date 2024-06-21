import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { User } from "../models/userModel";

declare module "express-session" {
  export interface SessionData {
    user: any;
  }
}

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        status: "fail",
        message: "username and password are required",
      });
      return;
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "username not found",
      });
      return;
    }

    if (!(await bcrypt.compareSync(password, user.password)))
      res.status(401).json({
        status: "fail",
        message: "username or password is incorrect",
      });
    else {
      req.session.user = user;
      res.status(200).json({
        status: "success",
        message: "user logged in",
        data: {
          user,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export { signUp, login };
