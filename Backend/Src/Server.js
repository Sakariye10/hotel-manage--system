"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("./Routes/UserRoute"));
const hotelRoute_1 = __importDefault(require("./Routes/hotelRoute"));
const FloorsRoute_1 = __importDefault(require("./Routes/FloorsRoute"));
const RoomtypRoute_1 = __importDefault(require("./Routes/RoomtypRoute"));
const Port = 9001;
const App = (0, express_1.default)();
App.use(express_1.default.json());
App.use("/api/users", UserRoute_1.default);
App.use("/api/hotels", hotelRoute_1.default);
App.use("/api/floor", FloorsRoute_1.default);
App.use("/api/roomtype", RoomtypRoute_1.default);
App.listen(Port, () => {
    console.log(`Server is running on ${Port} `);
});
