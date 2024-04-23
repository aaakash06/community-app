// const mongoose = require('mongoose');
import mongoose from "mongoose";
import { connect } from "mongoose";
const connectionString = process.env.DB_CONNECTION_STRING!;
const password = process.env.DB_PASSWORD!;

const CS = connectionString?.replace("<password>", password);

export async function connectToDB() {
  try {
  
    if (mongoose.connection.readyState === 1) {
      // console.log("already connected to db");
    
    } else {
  
      console.log("connecting to db....");

      await connect(CS,{dbName:"stack_overflow"});

      console.log("mongo connected");
    }
  } catch (err) {
    console.log(err)
console.log("couldn't connect to db");  
throw new Error("couldn't connect to DB error")
  }
}
