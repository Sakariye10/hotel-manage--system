import { PrismaClient } from "@prisma/client";
import { customUserRequest } from "../Helpers/Jwt";
import { Response } from "express";
const prisma = new PrismaClient();

// Get All Customers Endpoints 
export const getAllCustomers = async (req : customUserRequest , res : Response) => {
    try {
        const AllCustomers = await prisma.customers.findMany()
        if(!AllCustomers || AllCustomers.length === 0){
            res.status(401).json({
                IsSuccess : false,
                message : "There Is No Customers At This Moment"
            })
            return;
        }
        res.status(201).json({
            IsSuccess : true,
            message : " All Customers Displayed Successfully",
            result : AllCustomers
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : "Something Went Wrong Please Try Again Later"
        })
    }
}

// Get One Customers Using By Id 
export const getOneCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const {Cu_Id} = req.params
        if(!Cu_Id){
            res.status(401).json({
                IsSuccess : false,
                message : "Provide Customer Id"
            })
            return;
        }

        // Find Customers 
        const OneCustomer = await prisma.customers.findFirst({
            where : {
                Cu_Id : + Cu_Id
            }
        })

        if(!OneCustomer){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Customer Is Not Found Check Up The Id'
            })
            return;
        }

        res.status(201).json({
            IsSucess : true,
            message : 'One Customer Displayed Successfully',
            result : OneCustomer
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : "Something Went Wrong Please Try Again Later"
        })
    }
}

// Creating New Customer 
export const creatingCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const {Cu_Name  , Cu_Phone , Cu_Address} = req.body
        if(!Cu_Name || !Cu_Phone){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Customer Credentials'
            })
            return;
        }

        // Create Customer Now
        const NewCustomer = await prisma.customers.create({
            data : {
                Cu_Name,
                Cu_Phone,
                Cu_Address,
                Author_Id : req.User.U_Id
            }
        })
        res.status(201).json({
            IsSuccess : true,
            message : 'New Customer Registered Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}

// Updating Customer Using By Its Id 
export const updatingCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const {Cu_Id} = req.params
        if(!Cu_Id){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Customer Id'
            })
            return;
        }
        const { Cu_Name , Cu_Phone , Cu_Address} = req.body
        if(!Cu_Name || !Cu_Phone){
            res.status(401).json({
                IsSuccess : false,
                message : "Provide Customer Credentials"
            })
            return;
        }
        // Checking Customer If Found Or Not
        const CheckBooking = prisma.customers.findFirst({
            where : {
                Cu_Id : + Cu_Id
            }
        })
        if(!CheckBooking){
            res.status(401).json({
                IsSuccess : false,
                message : 'This Customer Is Not Found Check Up The Id'
            })
        }

        const upCustomer = await prisma.customers.update({
            where : {
                Cu_Id : + Cu_Id
            },
            data : {
                Cu_Name , 
                Cu_Phone,
                Cu_Address,
                Author_Id : req.User.U_Id
            }
        })

        res.status(201).json({
            IsSuccess : true,
            message : "Customer Updated Successfully"
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : " Something Went Wrong Please Try Again Later"
        })
        return
    }
}

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