// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../util/api/apiHandler";

type Data = {
  name: string;
};

export function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("here is method", req.method);
  // throw new Error("hello there is error");
  res.status(200).json({ name: "John Doe" });
}

export default apiHandler(handler);
