import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import { RoomUserRequest, generateToken } from "../Helpers/Jwt";


/// getLLRoomtype
const getAllRoom = async (req: RoomUserRequest, res: Response) => {
    try {
        const Roomtype = await prisma.roomtype.findMany({
            where:{
                Is_Deleted: false,
            }
        });

        // handle case where no roomtype are found
        if (!Roomtype||  Roomtype.length === 0) {
            res.status(404).json({ 
                isSuccess: false, 
                message: "No roomtype found"
             });
             return 
            res.status(200).json({
                isSuccess: true,
                data: Roomtype,
                message :"all roomtype found succesfully"
            })
         
        }

    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        })
    }
};


// create a new roomtype

export const CreateRoomtyp = async (req: RoomUserRequest, res: Response) => {
    try {
        const {Rt_Name, Rt_Price,No_Beds} = req.body;
        const newRoomtype = await prisma.roomtype.create({
            data: {
                Rt_Name,
                Rt_Price,
                No_Beds,
                Author_Id:  req.User.U_Id
            }
        })
        res.status(201).json({
            isSuccess: true,
            message:"new roomtype seccussfull",
            result: newRoomtype
        })
        
    } catch (error) {
        res.status(404).json({
            isSuccess: false,
            message: "Roomtype not found"
        })
    }
}


/// delete and restore 
export const DeleteRoomtyp = async (req: RoomUserRequest, res: Response) => {
    try {
        const {Rt_Id}= req.body;
        const roomtype = await prisma.room_Type.findFirst({
            where: {
                Rt_Id: Rt_Id,
            }
        });

        if(!DeleteRoomtyp){
             res.status(404).json({
                isSuccess: false,
                message: "Roomtype not found"

            });
            return

        }
        /// togle the is-deleted

        const UpdateRoomtype = await prisma.room_Type.update({
            where: {Rt_Id:+Rt_Id},
            data: {Is_Deleted: !DeleteRoomtyp.Is_Deleted,}
        })

        res.status(200).json({
            isSuccess: true,
            message: "Roomtype deleted successfully",
            result: UpdateRoomtype,
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            isSuccess : false,  
            message : 'waxbaa qaldan',
        })
    }
}