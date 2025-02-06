import { Router } from "express";
import { getfloors , createFloors} from "../Controllers/FloorController"
const router = Router();
router.get('/getfloor', getfloors);
router.post('/createfloor', createFloors);




export default router;