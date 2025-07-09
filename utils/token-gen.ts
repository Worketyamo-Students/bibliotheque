import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret_key";
const secretRefresh = process.env.JWT_R_SECRET || "default_refresh_secret_key";

export const signToken = async (payload: string) => {
  const data = jwt.sign({ id: payload }, secret);
  return data;
};

export const signRefreshToken = async (payload: string) => {
  const data = jwt.sign({ payload }, secretRefresh);
  return data;
};

export const verifyToken = (payload: string): Promise<{ data: any }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, secret, (err, decoded) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve({ data: decoded });
    });
  });
};

export const decodeToken = async (payload: string) => {
  const data = jwt.decode(payload);
  return data;
  // console.log(data);
};
