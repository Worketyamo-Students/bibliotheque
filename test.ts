import jwt from "jsonwebtoken";

const secret =
  process.env.JWT_SECRET || "a-string-secret-at-least-256-bits-long";
// const secretRefresh = process.env.JWT_R_SECRET || "";

const verifyToken = async (payload: string) => {
  const data = jwt.verify(secret, payload, (err, decoded) => {
    if (err) console.error(err);
    return decoded;
  });
  console.log(data);
};

verifyToken(
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
);
