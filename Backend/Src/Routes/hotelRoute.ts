import { Router } from "express";
import {getAllhotel ,createHotels ,removeHotel  } from '../Controllers/hotelController';

const router = Router();
router.get('/Allhotel', getAllhotel);
router.post('/createhotel', createHotels);
router.put('/remove/:H_Id', removeHotel);






export default router;
