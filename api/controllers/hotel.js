import HotelModel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";


export const createHotel = async (req, res, next) => {
    const newHotel = new HotelModel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)

    } catch (err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await HotelModel.findByIdAndUpdate(req.params.Id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updatedHotel)

    } catch (err) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await HotelModel.findByIdAndDelete(req.params.Id);
        res.status(200).json("Hotel has been deleted.")

    } catch (err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findById(req.params.Id);
        res.status(200).json(hotel)

    } catch (err) {
        next(err);
    }
}

export const getAllHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await HotelModel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 20000},
        }).limit(req.query.limit);
        res.status(200).json(hotels);

    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return HotelModel.countDocuments({ city: city })
        }))
        res.status(200).json(list);

    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await HotelModel.countDocuments({ type: "hotel" });
        const appartmentCount = await HotelModel.countDocuments({ type: "appartment" });
        const resortCount = await HotelModel.countDocuments({ type: "resort" });
        const villaCount = await HotelModel.countDocuments({ type: "villa" });
        const cabinCount = await HotelModel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "appartment", count: appartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ]);

    } catch (err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findById(req.params.Id);
        // Check if the hotel was found
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return RoomModel.findById(room);
            })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
};
