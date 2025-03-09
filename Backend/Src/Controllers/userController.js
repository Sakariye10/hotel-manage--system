"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removingUser = exports.loginUser = exports.creatingNewUsers = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importStar(require("bcryptjs"));
const Jwt_1 = require("../Helpers/Jwt");
// import { Request , Response} from 'express'
// All Users 
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllUsers = yield prisma.users.findMany({
            where: {
                Is_Deleted: false
            }
        });
        if (!AllUsers || AllUsers.length === 0) {
            return res.status(400).json({
                IsSuccess: true,
                message: 'There Is No Users'
            });
        }
        res.status(200).json({
            IsSuccess: true,
            message: "All Users Displayed Successfully",
            result: AllUsers
        });
    }
    catch (error) {
        res.status(400).json({
            IsSuccess: false,
            message: ''
        });
    }
});
exports.getAllUsers = getAllUsers;
// Creating New Users 
const creatingNewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Phone, Email, Password } = req.body;
        if (!Name || !Phone || !Email || !Password) {
            return res.status(400).json({
                IsSuccess: false,
                message: " Provide Valid Credentials"
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(Password, 10);
        const NewUsers = yield prisma.users.create({
            data: {
                Name,
                Phone,
                Email,
                Role: Email === "admin12@gmail.com" ? "Super_Admin" : "User",
                Password: hashedPassword
            }
        });
        res.status(200).json({
            IsSuccess: true,
            message: 'New User Created Successfully',
            result: NewUsers
        });
    }
    catch (error) {
        res.status(400).json({
            IsSuccess: false,
            message: 'Something Went Wrong Please Try Again Later'
        });
    }
});
exports.creatingNewUsers = creatingNewUsers;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                IsSuccess: false,
                message: " Provide Valid Credentials"
            });
        }
        const CheckEmail = yield prisma.users.findFirst({
            where: {
                Email: Email
            },
            select: {
                Password: true,
                U_Id: true,
                Email: true,
                Name: true,
                Role: true
            }
        });
        if (!CheckEmail) {
            return res.status(400).json({
                IsSuccess: false,
                message: "Email Not Found"
            });
        }
        const CheckPassword = (0, bcryptjs_1.compareSync)(Password, CheckEmail.Password);
        if (!CheckPassword) {
            return res.status(400).json({
                IsSuccess: false,
                message: "Invalid Password"
            });
        }
        const result = {
            Name: CheckEmail.Name,
            token: (0, Jwt_1.generateToken)({
                Fullname: CheckEmail.Name,
                U_Id: CheckEmail.U_Id,
                Role: CheckEmail.Role,
                Email: CheckEmail.Email
            })
        };
        res.status(200).json({
            IsSuccess: true,
            message: "User Logged Successfully",
            result
        });
    }
    catch (error) {
        res.status(400).json({
            IsSuccess: false,
            message: "Something Went Wrong Please Try Again Later"
        });
    }
});
exports.loginUser = loginUser;
// Delete User
const removingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { U_Id } = req.params;
        // Checking User If Found Or Not 
        const CheckingUser = yield prisma.users.findFirst({
            where: {
                U_Id: +U_Id
            }
        });
        if (!CheckingUser) {
            return res.status(400).json({
                IsSuccess: false,
                message: "User Not Found"
            });
        }
        const r_User = yield prisma.users.update({
            where: {
                U_Id: +U_Id
            },
            data: {
                Is_Deleted: !CheckingUser.Is_Deleted
            }
        });
        res.status(200).json({
            IsSuccess: true,
            message: "User Deleted Successfully",
            result: r_User
        });
    }
    catch (error) {
        res.status(400).json({
            IsSuccess: false,
            message: " Soemthing Went Wrong Please Try Again Later"
        });
    }
});
exports.removingUser = removingUser;
