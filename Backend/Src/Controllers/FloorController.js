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
exports.removeFloor = exports.createFloors = exports.getfloors = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
const getfloors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all floors that are not marked as deleted
        const floors = yield prisma.floor.findMany({
            where: {
                Is_Deleted: false, // Assuming "Is_Deleted" is a boolean field
            },
        });
        // Handle case where no floors are found
        if (!floors || floors.length === 0) {
            res.status(404).json({
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
    }
    catch (error) {
        console.error("Error fetching floors:", error); // Log the error for debugging
        res.status(500).json({
            isSuccess: false,
            message: "wax baa qaldan ee hubi zxp.",
        });
    }
});
exports.getfloors = getfloors;
// create floors
const createFloors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { No_Rooms, H_Id, F_No, } = req.body;
        if (!No_Rooms || !H_Id || !F_No) {
            return res.status(400).json({
                isSuccess: false,
                message: "waxba kumaa jiraaan sheeikhow",
            });
        }
        const newFloor = yield prisma.floor.create({
            data: {
                No_Rooms,
                H_Id,
                F_No,
                Author_Id: req.User.U_Id
            }
        });
        res.status(201).json({
            isSuccess: true,
            message: "New floor created successfully",
            result: newFloor
        });
    }
    catch (error) {
        res.status(404).json({
            isSuccess: false,
            message: 'waxbaa qaldan',
        });
    }
});
exports.createFloors = createFloors;
// delete or restore data
const removeFloor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1️⃣ Extract F_Id from request parameters
        const { F_Id } = req.params;
        // 2️⃣ Convert F_Id to a number and validate
        const floorId = Number(F_Id);
        if (isNaN(floorId)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Floor ID",
            });
        }
        // 3️⃣ Find the floor in the database
        const floor = yield prisma.floor.findFirst({
            where: { F_Id: floorId },
        });
        // 4️⃣ If the floor is not found, return a 404 response
        if (!floor) {
            return res.status(404).json({
                isSuccess: false,
                message: "Floor not found",
            });
        }
        // 5️⃣ Toggle the `Is_Deleted` field (soft delete or restore)
        const updatedFloor = yield prisma.floor.update({
            where: { F_Id: floorId },
            data: { Is_Deleted: !floor.Is_Deleted },
        });
        // 6️⃣ Return success response
        return res.status(200).json({
            isSuccess: true,
            message: "Floor deleted successfully",
            result: updatedFloor,
        });
    }
    catch (error) {
        console.error("Error removing floor:", error);
        // 7️⃣ Handle errors properly
        return res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
        });
    }
});
exports.removeFloor = removeFloor;
