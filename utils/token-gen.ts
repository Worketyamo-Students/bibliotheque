import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";
const secretRefresh = process.env.JWT_R_SECRET || "";

export const signToken = async (payload: string) => {
  const data = jwt.sign({ user: payload }, secret);
  return data;
};

export const signRefreshToken = async (payload: string) => {
  const data = jwt.sign({ payload }, secretRefresh);
  return data;
};

export const verifyToken = async (payload: string) => {
  const data = jwt.verify(secret, payload, (err, decoded) => {
    if (err) console.error(err);
    return decoded;
  });
  console.log(data);
};

export const decodeToken = async (payload: string) => {
  const data = jwt.decode(payload);
  return data;
  // console.log(data);
};
