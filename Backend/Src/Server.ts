import express from "express"
import UserRoute from './Routes/UserRoute'
import HotelRouter from './Routes/hotelRoute'
import FloorsRouter from './Routes/FloorsRoute'
const Port = 9001;
const App = express();

App.use(express.json());

App.use("/api/users" , UserRoute)
App.use("/api/hotels" , HotelRouter)
App.use("/api/floor" , FloorsRouter)


App.listen(Port , () => {
    console.log(`Server is running on ${Port} `)
})