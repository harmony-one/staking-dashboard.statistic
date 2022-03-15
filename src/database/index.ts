import mongoose from 'mongoose'

export const connection = mongoose.connection;

connection.once("open", function() {
  console.log("### MongoDB database connection established successfully");
});

export function dbConnect() {
  return mongoose.connect('mongodb://localhost:27017/test');
}
