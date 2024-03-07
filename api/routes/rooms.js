import express from "express";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom);

//update
router.put("/:Id", verifyAdmin, updateRoom);
router.put("/availbility/:Id",  updateRoomAvailability);


//delete
router.delete("/:Id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:Id", getRoom);

//get all
router.get("/", getAllRoom);

export default router