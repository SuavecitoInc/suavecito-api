import type { Request, Response } from "express";

export const helloFriend = (req: Request, res: Response) => {
  res.status(200).send("Hello, friend...");
};
