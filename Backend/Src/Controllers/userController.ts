import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
const prisma = new PrismaClient();
import bcryptjs, { compareSync } from 'bcryptjs'
import { generateToken } from '../Helpers/Jwt';
// import { Request , Response} from 'express'

// All Users 
export const getAllUsers = async ( req : Request , res : Response) : Promise<any> => {
    try {
        const AllUsers = await prisma.users.findMany({
            where : {
                Is_Deleted : false
            }
        })
        if(!AllUsers || AllUsers.length === 0){
            return res.status(400).json({
                IsSuccess : true,
                message : 'There Is No Users'
            })
        }

        res.status(200).json({
            IsSuccess : true,
            message : "All Users Displayed Successfully",
            result : AllUsers
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : ''
        })
    }
}


// Creating New Users 
export const creatingNewUsers = async ( req : Request , res : Response) : Promise<any>=> {
    try {
        const {Name , Phone , Email , Password} = req.body
        if(!Name || !Phone|| !Email || !Password){
            return res.status(400).json({
                IsSuccess : false,
                message : " Provide Valid Credentials"
            })
        }

        const hashedPassword = await bcryptjs.hash(Password , 10)

        const NewUsers = await prisma.users.create({
            data : {
                Name,
                Phone,
                Email,
                Role : Email === "admin12@gmail.com" ? "Super_Admin" : "User",
                Password : hashedPassword
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'New User Created Successfully',
            result : NewUsers
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}

// Login User
export const loginUser = async ( req  : Request , res : Response) : Promise<any> => {
    try {
        const {Email , Password} = req.body
        if(!Email || !Password){
            return res.status(400).json({
                IsSuccess : false,
                message : " Provide Valid Credentials"
            })
        }
        const CheckEmail = await prisma.users.findFirst({
            where : {
                Email : Email
            },
            select : {
                Password : true,
                U_Id : true,
                Email : true,
                Name : true,
                Role : true
            }
        })
        if(!CheckEmail){
            return res.status(400).json({
                IsSuccess : false,
                message : "Email Not Found"
            })
        }
        const CheckPassword = compareSync(Password , CheckEmail.Password)
        if(!CheckPassword){
            return res.status(400).json({
                IsSuccess : false,
                message : "Invalid Password"
            })
        }
        const result = {
            Name : CheckEmail.Name,
            token : generateToken({
                Fullname : CheckEmail.Name,
                U_Id : CheckEmail.U_Id,
                Role : CheckEmail.Role,
                Email : CheckEmail.Email
            })
        }
        res.status(200).json({
            IsSuccess : true,
            message : "User Logged Successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : "Something Went Wrong Please Try Again Later"
        })
    }
}

// Delete User
export const removingUser = async ( req : Request , res : Response) : Promise<any> => {
    try {
        const { U_Id } = req.params
        // Checking User If Found Or Not 
        const CheckingUser = await prisma.users.findFirst({
            where :{
                U_Id : +U_Id
            }
        })
        if(!CheckingUser){
            return res.status(400).json({
                IsSuccess : false,
                message : "User Not Found"
            })
        }
       const r_User =  await prisma.users.update({
            where : {
                U_Id : + U_Id
            },
            data : {
                Is_Deleted : !CheckingUser.Is_Deleted
            }
        })
        res.status(200).json({
            IsSuccess : true,
            message : "User Deleted Successfully",
            result : r_User
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : " Soemthing Went Wrong Please Try Again Later"
        })
    }
}