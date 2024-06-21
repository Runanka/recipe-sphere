import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.session.user;

  if (!user) {
    res.status(401).json({
      status: "fail",
      message: "unauthorized",
    });
    return;
  }

  req.user = user;

  next();
};
