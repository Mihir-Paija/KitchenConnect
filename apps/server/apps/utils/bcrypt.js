import Bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await Bcrypt.genSalt(saltRounds);
    const hashedPassword = await Bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

const comparePassword = async (password, hash) => {
  try {
    const isMatch = await Bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
};

export { hashPassword, comparePassword };
