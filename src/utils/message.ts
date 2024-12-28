import { response, Response } from "express";

interface Message {
  res: Response;
  status: number;
  message: string;
  data?: unknown;
}

export const message = ({ res, status, message, data }: Message) => {
  return res.status(status).json({
    data,
    status,
    message,
  });
};
