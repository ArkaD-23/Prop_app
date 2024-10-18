import dotenv from "dotenv";
import mongoose from "mongoose";
import {app} from "./app.js";

dotenv.config({
  path:"./.env"
});

;(async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Connected to the database........");
      })
    app.listen(process.env.PORT, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
  }
  catch(err) {
    console.log(err);
    process.exit(1);
  };
})();


