"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (User) => {
    const Payload = User;
    return jsonwebtoken_1.default.sign(Payload, " SAKARIA_1456", {
        expiresIn: "1h"
    });
};
exports.generateToken = generateToken;
const decodeToken = (req, res, next) => {
    var _a, _b;
    try {
        const Token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) &&
            ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
        // console.log(Token)
        if (!Token) {
            return res.json({
                IsSuccess: false,
                message: 'UnAuthorized'.toUpperCase()
            });
        }
        const decode = jsonwebtoken_1.default.verify(Token, "SAKARIA_1456");
        req.User = Object.assign({}, decode);
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({
            IsSuccess: false,
            message: ' Something Went Wrong Please Try Again Later !!'.toUpperCase()
        });
    }
};
exports.decodeToken = decodeToken;
