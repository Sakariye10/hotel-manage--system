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
exports.DeleteRoomtyp = exports.CreateRoomtyp = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/// getLLRoomtype
const getAllRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Roomtype = yield prisma.roomtype.findMany({
            where: {
                Is_Deleted: false,
            }
        });
        // handle case where no roomtype are found
        if (!Roomtype || Roomtype.length === 0) {
            res.status(404).json({
                isSuccess: false,
                message: "No roomtype found"
            });
            return;
            res.status(200).json({
                isSuccess: true,
                data: Roomtype,
                message: "all roomtype found succesfully"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
});
// create a new roomtype
const CreateRoomtyp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Rt_Name, Rt_Price, No_Beds } = req.body;
        const newRoomtype = yield prisma.roomtype.create({
            data: {
                Rt_Name,
                Rt_Price,
                No_Beds,
                Author_Id: req.User.U_Id
            }
        });
        res.status(201).json({
            isSuccess: true,
            message: "new roomtype seccussfull",
            result: newRoomtype
        });
    }
    catch (error) {
        res.status(404).json({
            isSuccess: false,
            message: "Roomtype not found"
        });
    }
});
exports.CreateRoomtyp = CreateRoomtyp;
/// delete and restore 
const DeleteRoomtyp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Rt_Id } = req.body;
        const roomtype = yield prisma.room_Type.findFirst({
            where: {
                Rt_Id: Rt_Id,
            }
        });
        if (!exports.DeleteRoomtyp) {
            res.status(404).json({
                isSuccess: false,
                message: "Roomtype not found"
            });
            return;
        }
        /// togle the is-deleted
        const UpdateRoomtype = yield prisma.room_Type.update({
            where: { Rt_Id: +Rt_Id },
            data: { Is_Deleted: !exports.DeleteRoomtyp.Is_Deleted, }
        });
        res.status(200).json({
            isSuccess: true,
            message: "Roomtype deleted successfully",
            result: UpdateRoomtype,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            isSuccess: false,
            message: 'waxbaa qaldan',
        });
    }
});
exports.DeleteRoomtyp = DeleteRoomtyp;
