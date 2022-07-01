import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
