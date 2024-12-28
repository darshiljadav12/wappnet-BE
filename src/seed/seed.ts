import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { Contact } from "../model";
import { connectDB } from "../utils";

// Function to seed data
const seedContacts = async () => {
  try {
    // Connect to MongoDB
    dotenv.config();
    await connectDB();

    // Read the data from the JSON file
    const filePath = path.join(__dirname, "data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON data
    const contacts = JSON.parse(rawData);

    // Delete all existing contacts (optional, to start fresh)
    await Contact.deleteMany({});

    // Insert the new contacts into the database
    await Contact.insertMany(contacts);

    console.log(`${contacts.length} contacts have been seeded successfully!`);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding contacts:", error);
  }
};

seedContacts();
