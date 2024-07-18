import admin from "../../models/adminModel.js";
import adminSignupValidation from "../../utils/validations/admin/authValidation.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { signJwt } from "../../utils/jwt.js";

export const adminSignup = async (req, res) => {
  try {
    const { name, id, password, role } = req.body;
    // console.log(name, id, password, role)
    if (!name || !id || !password || !role)
      return res.status(400).send({
        message: `Please Enter All Feilds`,
      });

    const data = {
      name,
      id,
      password,
      role,
    };

    const valid = await adminSignupValidation(data);
    if (!valid)
      return res.status(400).send({
        message: `Validation Failed`,
      });

    const exists = await admin.findOne({ id: id });

    if (exists)
      return res.status(400).send({
        message: `User Exists! Please Login`,
      });

    const hashedPassword = await hashPassword(password);

    const newData = {
      name,
      id,
      password: hashedPassword,
      role,
    };

    const newUser = await admin.create(newData);

    if (!newUser)
      return res.status(500).send({
        message: `Couldn't Create User`,
      });

    return res.status(200).send({
      message: `User Created Successfully`,
    });
  } catch (error) {
    console.log("Error in Admin Signup ", error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password)
      return res.status(400).send({
        message: `Please Enter All Feilds`,
      });

    const user = await admin.findOne({ id: id });

    if (!user)
      return res.status(400).send({
        message: `User Doesn't Exist! Please Signup`,
      });

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword)
      return res.status(400).send({
        message: `Invalid Credentials!`,
      });

    const token = { userID: id, role: user.role };
    const authToken = signJwt(token);

    // res.cookie("Session", authToken);

    return res.status(200).send({
      message: `Successful Login!`,
      authToken,
    });
  } catch (error) {
    console.log(`Error in admin login `, error);
    return res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};
