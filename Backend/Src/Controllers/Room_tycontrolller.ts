import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import { RoomUserRequest, generateToken } from "../Helpers/Jwt";

// Get all room types
export const getAllRoom = async (req: RoomUserRequest, res: Response):Promise<any> => {
    try {
        const roomtype = await prisma.roomtype.findMany({
            where: {
                Is_Deleted: false,
            },
        });

        // Handle case where no room types are found
        if (!roomtype || roomtype.length === 0) {
            return res.status(404).json({
                isSuccess: false,
                message: "No room type found",
            });
        }

        return res.status(200).json({
            isSuccess: true,
            data: roomtype,
            message: "All room types found successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

// Create a new room type
export const CreateRoomtyp = async (req: RoomUserRequest, res: Response):Promise<any> => {
    try {
        const { Rt_Name, Rt_Price, No_Beds } = req.body;

        // Ensure that all necessary fields are provided
        if (!Rt_Name || !Rt_Price || !No_Beds) {
            return res.status(400).json({
                isSuccess: false,
                message: "Missing required fields",
            });
        }

        const newRoomtype = await prisma.roomtype.create({
            data: {
                Rt_Name,
                Rt_Price,
                No_Beds,
                Author_Id: req.User.U_Id,
            },
        });

        return res.status(201).json({
            isSuccess: true,
            message: "New room type created successfully",
            result: newRoomtype,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to create room type",
        });
    }
};

// Delete or restore room type
export const DeleteRoomtyp = async (req: Request, res: Response):Promise<any> => {
    try {
        const { Rt_Id } = req.body;

        // Validate Rt_Id
        if (!Rt_Id || isNaN(Number(Rt_Id))) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Room Type ID",
            });
        }

        // Find the existing room type
        const roomtype = await prisma.roomtype.findFirst({
            where: { Rt_Id: Number(Rt_Id) },
        });

        if (!roomtype) {
            return res.status(404).json({
                isSuccess: false,
                message: "Room type not found",
            });
        }

        // Toggle the Is_Deleted field
        const updatedRoomtype = await prisma.roomtype.update({
            where: { Rt_Id: Number(Rt_Id) },
            data: { Is_Deleted: !roomtype.Is_Deleted },
        });

        return res.status(200).json({
            isSuccess: true,
            message: "Room type updated successfully",
            result: updatedRoomtype,
        });

    } catch (error) {
        console.error("Error deleting room type:", error);
        return res.status(500).json({
            isSuccess: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
