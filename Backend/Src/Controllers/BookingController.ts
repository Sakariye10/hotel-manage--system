import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { customUserRequest } from "../Helpers/Jwt";
import { Response } from "express";


// Get All Booking Onlu Logged User Can Seen This Data 
export const getAllBookings = async ( req : customUserRequest , res : Response) => {
   try {
    const AllBooking = await prisma.booking.findMany()
    if(!AllBooking || AllBooking.length === 0){
        res.status(401).json({
            IsSuccess : false,
            message : " There Is No Bookings At This Moment"
        })
        return
    }
    res.status(201).json({
        IsSuccess : true,
        message : ' All Booking Displayed Successfully',
        result : AllBooking
    })
   } catch (error) {
    res.status(501).json({
        IsSuccess : false,
        message : "Something Went Wrong Please Try Again Later"
    })
    return;
   }
}

// Get One Booking Using Booking Id 
export const getOneBooking = async ( req : customUserRequest , res : Response) => {
    try {
        const {Bk_Id} = req.params;
        if(!Bk_Id){
            res.status(401).json({
                IsSuccess : false,
                message : "Provide Booking Id"
            })
        }

        // Checking Booking If it found or not 
        const CheckBooking = await prisma.booking.findFirst({
            where : {
                Bk_Id : + Bk_Id
        }
        })
        if(!CheckBooking){
            res.status(401).json({
                IsSuccess : false,
                message : "This Booking Is Not Found Check Up The Id"
            })
            return;
        }

        res.status(201).json({
            IsSuccess : true,
            message : 'One Book Displayed Successfully',
            result : CheckBooking
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : "Something Went Wrong Please Try Again Later"
        })
        return;
    }
}


export const creatingBooking = async ( req: customUserRequest , res : Response) => {
    try {
        const {} = req.body
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : " Something Went Wrong Please Try Again Later"
        })
    }
}



// Removing 