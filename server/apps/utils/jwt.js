import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const maxAge = 120 * 60 * 60; // 10hr

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
      console.log('Token Expired')
      return {
        valid: true,
        expired: true
      }
    } else {
      console.log('Invalid Token')
      return {
        valid: false,
      }
    }
  }
};

export { signJwt, maxAge, verifyJwt };
