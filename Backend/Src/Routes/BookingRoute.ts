import { Router } from "express";
import {getAllBookings,  } from '../Controllers/BookingController';

const router = Router();
router.get("Booking" , getAllBookings);
router.post('/createhotel', createHotels);
router.put('/remove/:H_Id', removeHotel);






export default router;
