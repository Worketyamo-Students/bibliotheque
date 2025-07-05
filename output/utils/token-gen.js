var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "";
const secretRefresh = process.env.JWT_R_SECRET || "";
export const signToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jwt.sign({ user: payload }, secret);
    return data;
});
export const signRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jwt.sign({ payload }, secretRefresh);
    return data;
});
export const verifyToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jwt.verify(secret, payload, (err, decoded) => {
        if (err)
            console.error(err);
        return decoded;
    });
    console.log(data);
});
export const decodeToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = jwt.decode(payload);
    return data;
});
