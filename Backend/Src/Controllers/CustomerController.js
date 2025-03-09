"use strict";
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
exports.updatingCustomer = exports.creatingCustomer = exports.getOneCustomer = exports.getAllCustomers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get All Customers Endpoints 
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllCustomers = yield prisma.customers.findMany();
        if (!AllCustomers || AllCustomers.length === 0) {
            res.status(401).json({
                IsSuccess: false,
                message: "There Is No Customers At This Moment"
            });
            return;
        }
        res.status(201).json({
            IsSuccess: true,
            message: " All Customers Displayed Successfully",
            result: AllCustomers
        });
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: "Something Went Wrong Please Try Again Later"
        });
    }
});
exports.getAllCustomers = getAllCustomers;
// Get One Customers Using By Id 
const getOneCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Cu_Id } = req.params;
        if (!Cu_Id) {
            res.status(401).json({
                IsSuccess: false,
                message: "Provide Customer Id"
            });
            return;
        }
        // Find Customers 
        const OneCustomer = yield prisma.customers.findFirst({
            where: {
                Cu_Id: +Cu_Id
            }
        });
        if (!OneCustomer) {
            res.status(400).json({
                IsSuccess: false,
                message: 'This Customer Is Not Found Check Up The Id'
            });
            return;
        }
        res.status(201).json({
            IsSucess: true,
            message: 'One Customer Displayed Successfully',
            result: OneCustomer
        });
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: "Something Went Wrong Please Try Again Later"
        });
    }
});
exports.getOneCustomer = getOneCustomer;
// Creating New Customer 
const creatingCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Cu_Name, Cu_Phone, Cu_Address } = req.body;
        if (!Cu_Name || !Cu_Phone) {
            res.status(401).json({
                IsSuccess: false,
                message: 'Provide Customer Credentials'
            });
            return;
        }
        // Create Customer Now
        const NewCustomer = yield prisma.customers.create({
            data: {
                Cu_Name,
                Cu_Phone,
                Cu_Address,
                Author_Id: req.User.U_Id
            }
        });
        res.status(201).json({
            IsSuccess: true,
            message: 'New Customer Registered Successfully'
        });
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: 'Something Went Wrong Please Try Again Later'
        });
    }
});
exports.creatingCustomer = creatingCustomer;
// Updating Customer Using By Its Id 
const updatingCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Cu_Id } = req.params;
        if (!Cu_Id) {
            res.status(401).json({
                IsSuccess: false,
                message: 'Provide Customer Id'
            });
            return;
        }
        const { Cu_Name, Cu_Phone, Cu_Address } = req.body;
        if (!Cu_Name || !Cu_Phone) {
            res.status(401).json({
                IsSuccess: false,
                message: "Provide Customer Credentials"
            });
            return;
        }
        // Checking Customer If Found Or Not
        const CheckBooking = prisma.customers.findFirst({
            where: {
                Cu_Id: +Cu_Id
            }
        });
        if (!CheckBooking) {
            res.status(401).json({
                IsSuccess: false,
                message: 'This Customer Is Not Found Check Up The Id'
            });
        }
        const upCustomer = yield prisma.customers.update({
            where: {
                Cu_Id: +Cu_Id
            },
            data: {
                Cu_Name,
                Cu_Phone,
                Cu_Address,
                Author_Id: req.User.U_Id
            }
        });
        res.status(201).json({
            IsSuccess: true,
            message: "Customer Updated Successfully"
        });
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: " Something Went Wrong Please Try Again Later"
        });
        return;
    }
});
exports.updatingCustomer = updatingCustomer;
// Remove Customer Using By Id 
// export const removingCustomer = async ( req : customUserRequest , res : Response) => {
//     try {
//         const {Cu_Id} = req.params
//         if(!Cu_Id){
//             res.status(401).json({
//                 IsSuccess : false,
//                 message : 'Provide Customer Id To Remove'
//             })
//         }
//         // Checking Customer If It found Or Not 
//         const CheckCustomer = prisma.customers.findUnique({
//             where : {
//                 Cu_Id : + Cu_Id
//             }
//         })
//         if(!CheckCustomer){
//             return res.status(401).json({
//                 IsSuccess : false,
//                 message : 'This Customer Is Not Found Check Up The Id'
//             })
//         }
//         const RemCustomer = await prisma.customers.update({
//             where : {
//                 Cu_Id : + Cu_Id
//             },
//             data : {
//             }
//         })
//     } catch (error) {
//         res.status(501).json({
//             IsSuccess : false,
//             message : "Something Went Wrong Please Try Again Later"
//         })
//     }
// }
