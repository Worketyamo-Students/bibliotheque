import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";
const secretRefresh = process.env.JWT_R_SECRET || "";

export const signToken = async (payload: string) => {
  const data = jwt.sign({ payload }, secret);
  return data;
};

export const signRefreshToken = async (payload: string) => {
  const data = jwt.sign({ payload }, secretRefresh);
  return data;
};

export const verifyToken = async (payload: string) => {
  const data = jwt.verify(secret, payload, (err, decoded) => {
    if (err) throw err;
    return decoded;
  });
  console.log(data);
};
