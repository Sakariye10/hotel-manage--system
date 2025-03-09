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
exports.removeHotel = exports.createHotels = exports.getAllhotel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/// getAll
const getAllhotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield prisma.hotel.findMany({
            where: {
                Is_Deleted: false
            }
        });
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({
                isSuccess: true,
                message: "No hotels found",
            });
        }
        res.status(200).json({
            isSuccess: true,
            message: "All hotels displayed successfully",
            result: hotels
        });
    }
    catch (error) {
        res.status(400).json({
            isSuccess: false,
            message: '',
        });
    }
});
exports.getAllhotel = getAllhotel;
/// creAte hotels
const createHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { H_No, Address, No_Floors } = req.body;
        if (!H_No || !Address || !No_Floors) {
            return res.status(400).json({
                IsSuccess: false,
                message: " Provide Valid Credentials"
            });
        }
        const new_Hotels = yield prisma.hotel.create({
            data: {
                H_No: H_No,
                Address,
                No_Floors
            }
        });
        res.status(201).json({
            isSuccess: true,
            message: "Hotel created successfully",
            result: new_Hotels
        });
    }
    catch (error) {
        res.status(400).json({
            isSuccess: false,
            message: '',
        });
    }
});
exports.createHotels = createHotels;
/// remove and restore
const removeHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { H_Id } = req.params;
        // Check if the hotel exists
        const r_hotel = yield prisma.hotel.findFirst({
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
        const updatedHotel = yield prisma.hotel.update({
            where: {
                H_Id: +H_Id,
            },
            data: {
                Is_Deleted: !r_hotel.Is_Deleted,
            }
        });
        res.status(200).json({
            isSuccess: true,
            message: "Hotel status updated successfully",
            result: updatedHotel,
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({
            isSuccess: false,
            message: "Something went wrong. Please try again later.",
        });
    }
});
exports.removeHotel = removeHotel;
