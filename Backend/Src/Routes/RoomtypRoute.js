"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Room_tycontrolller_1 = require("../Controllers/Room_tycontrolller");
const router = (0, express_1.Router)();
router.get('/getallroom', Room_tycontrolller_1.getAllRoom);
router.post('/createroomtype', Room_tycontrolller_1.CreateRoomtyp);
router.put('/');
exports.default = router;
