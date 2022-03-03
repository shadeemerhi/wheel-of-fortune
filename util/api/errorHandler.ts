import { NextApiResponse } from "next";

export const errorHandler = (err: any, res: NextApiResponse) => {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  console.error("here is fucking error", err);
  return res.status(500).json({ message: err.message });
};
