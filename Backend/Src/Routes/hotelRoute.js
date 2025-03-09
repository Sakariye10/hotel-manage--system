"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelController_1 = require("../Controllers/hotelController");
const router = (0, express_1.Router)();
router.get('/Allhotel', hotelController_1.getAllhotel);
router.post('/createhotel', hotelController_1.createHotels);
router.put('/remove/:H_Id', hotelController_1.removeHotel);
exports.default = router;
