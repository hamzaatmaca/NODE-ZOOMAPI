import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { generateSignature } from "./tools/generateSignature";

const app = express();

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const zoomEndpoint = process.env.API_SERVER;
const zoomApiKey = "T8gye_3wTcOZKHdiPeQDtQ";
const zoomApiSecret = "x89jdFYQYa0WAxOYMnjGX1NPvyluZpnw";
const meetingNumber = 123456789;
const role = 0;

const zoomJwt = generateSignature(
  zoomApiKey,
  zoomApiSecret,
  meetingNumber,
  role
);

const x = async () => {
  try {
    const response = await axios.get(`${zoomEndpoint}users/me/meetings`, {
      headers: {
        Authorization: `Bearer ${zoomJwt}`,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Zoom Meeting API Error: ", error);
  }
};
x();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
