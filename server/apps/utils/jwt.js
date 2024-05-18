import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const maxAge = 24 * 60 * 60; // 24hr

const signJwt = (object) => {
  return Jwt.sign(object, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const verifyJwt = (jwtToken) => {
  try {
    const decoded = Jwt.verify(jwtToken, process.env.JWT_SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("JWT token is expired");
    } else {
      throw new Error("JWT token is not valid");
    }
  }
};

export { signJwt, maxAge, verifyJwt };
