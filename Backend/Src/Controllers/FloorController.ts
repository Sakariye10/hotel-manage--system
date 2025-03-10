import { Response } from "express";
import { customUserRequest } from "../Helpers/Jwt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getAllFloors = async ( req : customUserRequest , res : Response) : Promise<any> => {
    try{
        const AllFloors = await prisma.floor.findMany({
            where : {
                Is_Deleted : true
            }
        })    
        if(!AllFloors || AllFloors.length === 0){
            res.status(401).json({
                IsSuccess : false,
                message  : 'There Is No Floors At This Moment'
            })
            return
        }
        res.status(201).json({
            IsSuccess : true,
            message : 'All Floors Retrieved Successfully',
            result: AllFloors
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : ' Somethng Went Wrong Please Try Again Later'
        })
    }
}