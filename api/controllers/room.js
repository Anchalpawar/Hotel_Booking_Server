import RoomModel from "../models/RoomModel.js";
import HotelModel from "../models/HotelModel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next,) => {

    const hotelId = req.params.hotelid;
    const newRoom = new RoomModel(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await HotelModel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }

}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await RoomModel.findByIdAndUpdate(req.params.Id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updatedRoom)

    } catch (err) {
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
       await RoomModel.updateOne({"roomNumbers._Id": req.params.Id},
       {
        $push:{
            "roomNumbers.$.unAvailableDates": req.body.dates
        },
       }
       );
        res.status(200).json("Date has been added to unavailable dates");

    } catch (err) {
        next(err);
    }
}


export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        await RoomModel.findByIdAndDelete(req.params.Id);
        try {
            await HotelModel.findByIdAndUpdate(hotelId,
                { $pull: { rooms: req.params.Id } })
        } catch (err) {
            console.log("Eroor 1");
            next(err)
        }
        res.status(200).json("Room has been deleted.");

    } catch (err) {
        console.log("error 2");
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.Id);
        res.status(200).json(room)

    } catch (err) {
        next(err);
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find();
        res.status(200).json(rooms);

    } catch (err) {
        next(err);
    }
}