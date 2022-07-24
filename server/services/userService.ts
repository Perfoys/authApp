import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import MailService from "./mailService";

class UserService {
  registration = async (email, password) => {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`User with ${email} already exists`);
    }
    const hashPassword = bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await MailService.sendActivationMail(email, activationLink);
  }
};

export default new UserService();