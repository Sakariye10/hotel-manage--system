import { Router } from "express";
import { getfloors, createFloors, removeFloor} from "../Controllers/FloorController";

const router = Router();

router.get('/getfloor', getfloors);
router.post('/createfloor', createFloors);
router.put('/remove/:F_Id', removeFloor); // ✅ Fixed "reomve" typo

export default router;
