import { Request, Response } from "express";

import { Contact } from "../model";
import { message } from "../utils";
import { MessageEnum } from "./enums";


export const getContacts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, searchQuery = "", tags = "" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const regex = new RegExp(searchQuery as string, "i"); // Case-insensitive search

    // Build the query 
    // TODO: Use proper type
    const query: any = {
      $or: [
        { name: regex },
        { number: regex },
        { avatar: regex },
        // { tags: { $in: tags.split(",") } }, // Search for tags by matching any tag in the tags array
      ],
    };

    // Find contacts with search filter and pagination
    const contacts = await Contact.find(query)
    .skip(skip).limit(Number(limit)).sort({ name: 1 });;

    // Get total count of contacts (for pagination)
    const totalContacts = await Contact.countDocuments(query);

    message({
      data: {
        contacts,
        totalContacts,
        totalPages: Math.ceil(totalContacts / Number(limit)),
        currentPage: Number(page),
      },
      res,
      status: 200,
      message: MessageEnum.SUCCESS_CONTACTS
    });
  } catch (error) {
    console.error(MessageEnum.FAIL_CONTACTS, error);

    message({
      message: MessageEnum.FAIL_CONTACTS,
      res,
      status: 500,
    });
  }
};

// TODO: ADD ENDPOINT TO ADD/DELETE TAGS