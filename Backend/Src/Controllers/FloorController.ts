import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
const prisma = new PrismaClient();
import { customUserRequest, generateToken } from "../Helpers/Jwt";



//get all 
// export const getfloors = async (req: Request, res: Response) : Promise<any> => {
//     try {
//         const floors = await prisma.floor.findMany({
//             where :{
//                 Is_Deleted : false,
//             }
//         })
//         if(!floors || floors.length ===0){
//             return res.status(404).json({
//                 isSuccess :false,
//                 message : "No floors found",
//             })
//         }
//         res.status(200).json({
//             isSuccess :false,
//             message : "All floors displayed successfully",
//             result: floors
//         })
//     } catch (error) {
//         res.status(400).json({
//             isSuccess :false,
//             message : '',
//         })
//     }
// }

//Exmple get all

export const getfloors = async (req: Request, res: Response): Promise<any> => {
    try {
        // Fetch all floors that are not marked as deleted
        const floors = await prisma.floor.findMany({
            where: {
                Is_Deleted: false, // Assuming "Is_Deleted" is a boolean field
            },
        });

        // Handle case where no floors are found
        if (!floors || floors.length === 0) {
            return res.status(404).json({
                isSuccess: false, // Changed to false for consistency
                message: "No floors found.",
            });

        }

        // Return the floors if found
        res.status(200).json({
            isSuccess: true,
            message: "All floors displayed successfully.",
            result: floors,
        });
    } catch (error) {
        console.error("Error fetching floors:", error); // Log the error for debugging
        res.status(500).json({
            isSuccess: false,
            message: "wax baa qaldan ee hubi zxp.",
        });
    }
};



// create floors
export const createFloors = async (req: customUserRequest, res: Response) : Promise<any> => {
    try {
        const { No_Rooms, H_Id, F_No,  } = req.body;

        if(!No_Rooms || !H_Id || !F_No ){
            return res.status(400).json({
                isSuccess : false,
                message : "waxba kumaa jiraaan sheeikhow",
            })
        }
        const newFloor = await prisma.floor.create({
            data: {
                No_Rooms,
                H_Id,
                F_No,
                Author_Id : req.User.U_Id
            }
        })
        res.status(201).json({
            isSuccess : true,
            message : "New floor created successfully",
            result: newFloor
        })
    } catch (error) {
        res.status(404).json({
            isSuccess : false,
            message : 'waxbaa qaldan',
        })
    }
}