import { Router } from "express";
import { creatingNewUsers, getAllUsers, loginUser, removingUser } from "../Controllers/userController";

;
const router = Router();

router.get('/all' , getAllUsers)
router.post('/new' , creatingNewUsers)
router.post("/login" , loginUser)
router.put('/remove/:U_Id' , removingUser)

export default router;