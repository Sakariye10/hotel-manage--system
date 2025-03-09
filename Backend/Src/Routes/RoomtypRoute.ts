import { Router } from "express";
import { getAllRoom ,CreateRoomtyp, DeleteRoomtyp} from "../Controllers/Room_tycontrolller";

const router = Router();
router.get('/getallroom', getAllRoom);
router.post('/createroomtype',CreateRoomtyp);
router.put('/')






export default router;