import {Router} from 'express'
import { decodeToken } from '../Helpers/Jwt';
import { getAllFloors } from '../Controllers/FloorController';
const router = Router()
 router.get('/all' , decodeToken , getAllFloors)

export default router;