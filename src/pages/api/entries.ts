// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../util/api/apiHandler";
import dbConnect from "../../config/db";
import { EntryModel } from "../../models/Entry";

type Data = {
  message: string;
};

export async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("INSIDE OF THE REQUEST", process.env.MONGO_URI);
  await dbConnect();
  console.log("INSIDE OF THE REQUEST");

  EntryModel.create(req.body);

  res.status(200).json({ message: "Successfully saved" });
}

export default apiHandler(handler);
