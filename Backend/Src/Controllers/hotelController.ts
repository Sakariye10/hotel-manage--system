 import { PrismaClient } from "@prisma/client";
 import { Request,Response } from "express";
 const prisma = new PrismaClient();
//  import bcryptjs, { compareSync } from "bcryptjs";
 import { generateToken } from "../Helpers/Jwt"; 

/// getAll
 export const getAllhotel = async (req: Request, res: Response):Promise<any> => {
    try {
        const hotels = await prisma.hotel.findMany({
            where:{
                Is_Deleted :false
            }
        });
        if(!hotels || hotels.length===0){
            return res.status(404).json({
                isSuccess :true,
                message : "No hotels found",

            })
        }
        res.status(200).json({
            isSuccess :true,
            message : "All hotels displayed successfully",
            result: hotels
        })
    } catch (error) {
        res.status(400).json({
            isSuccess :false,
            message : '',
        })
    }
 }

/// creAte hotels
 export const createHotels = async (req: Request, res: Response):Promise<any> => {
    try {
        const { H_No,  Address , No_Floors } = req.body;
        if(!H_No ||  !Address || !No_Floors ){
            return res.status(400).json({
                 IsSuccess : false,
                message : " Provide Valid Credentials"
            })
        }
       

        const new_Hotels = await prisma.hotel.create({
            data :{
                H_No : H_No,
                Address,
                No_Floors
            }
        })
        res.status(201).json({
           
            isSuccess: true,
            message : "Hotel created successfully",
            result : new_Hotels
        })

    } catch (error) {
        res.status(400).json({
            isSuccess :false,
            message : '',
        }) 
    }
 }

 /// remove and restore
 export const removeHotel = async (req: Request, res: Response): Promise<any> => {
    try {
        const { H_Id } = req.params;

        // Check if the hotel exists
        const r_hotel = await prisma.hotel.findFirst({
            where: {
                H_Id: +H_Id,
            },
        });

        if (!r_hotel) {
            return res.status(404).json({
                isSuccess: false,
                message: "Hotel not found",
            });
        }

        // Toggle the is_Deleted flag
        const updatedHotel = await prisma.hotel.update({
            where: {
                H_Id: +H_Id,
            },
            data: {
                Is_Deleted : !r_hotel.Is_Deleted,
            }
        });

        res.status(200).json({
            isSuccess: true,
            message: "Hotel status updated successfully",
            result: updatedHotel,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({
            isSuccess: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};
