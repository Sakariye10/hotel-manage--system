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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FloorController_1 = require("../Controllers/FloorController"); // Adjust path as needed
const router = express_1.default.Router();
router.get('/getfloor', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, FloorController_1.getfloors)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/createfloor', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, FloorController_1.createFloors)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/remove/:F_Id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, FloorController_1.removeFloor)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
