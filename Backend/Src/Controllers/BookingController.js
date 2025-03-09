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
exports.creatingBooking = exports.getOneBooking = exports.getAllBookings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get All Booking Onlu Logged User Can Seen This Data 
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllBooking = yield prisma.booking.findMany();
        if (!AllBooking || AllBooking.length === 0) {
            res.status(401).json({
                IsSuccess: false,
                message: " There Is No Bookings At This Moment"
            });
            return;
        }
        res.status(201).json({
            IsSuccess: true,
            message: ' All Booking Displayed Successfully',
            result: AllBooking
        });
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: "Something Went Wrong Please Try Again Later"
        });
        return;
    }
});
exports.getAllBookings = getAllBookings;
// Get One Booking Using Booking Id 
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Bk_Id } = req.params;
        if (!Bk_Id) {
            res.status(401).json({
                IsSuccess: false,
                message: "Provide Booking Id"
            });
        }
        // Checking Booking If it found or not 
        const CheckBooking = yield prisma.booking.findFirst({
            where: {
                Bk_Id: +Bk_Id
            }
        });
        if (!CheckBooking) {
            res.status(401).json({
                IsSuccess: false,
                message: "This Booking Is Not Found Check Up The Id"
            });
            return;
        }
        res.status(201).json({
            IsSuccess: true,
            message: 'One Book Displayed Successfully',
            result: CheckBooking
        });
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: "Something Went Wrong Please Try Again Later"
        });
        return;
    }
});
exports.getOneBooking = getOneBooking;
const creatingBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {} = req.body;
    }
    catch (error) {
        res.status(501).json({
            IsSuccess: false,
            message: " Something Went Wrong Please Try Again Later"
        });
    }
});
exports.creatingBooking = creatingBooking;
// Removing 
