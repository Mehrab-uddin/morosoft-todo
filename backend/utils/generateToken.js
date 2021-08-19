import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "mehrab123", {
    expiresIn: "30d",
  });
};

export default generateToken;
