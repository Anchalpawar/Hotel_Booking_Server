import express from "express";
import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", verifyAdmin, createHotel);

//update
router.put("/:Id", verifyAdmin, updateHotel);

//delete
router.delete("/:Id", verifyAdmin, deleteHotel);

//get
router.get("/find/:Id", getHotel);

//get all
router.get("/", getAllHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:Id", getHotelRooms);

export default router