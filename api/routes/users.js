import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyToken , verifyUser, verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("Hello user, you are successfully logged in");
});

router.get("/checkuser/:Id", verifyUser, (req, res, next)=>{
   res.send("Hello user, you are logged in and you can delete your account.")
});

router.get("/checkadmin/:Id", verifyAdmin, (req, res, next)=>{
    res.send("Hello admin, you are logged in and you can delete all accounts.")
 });
 
 //update
router.put("/:Id", verifyUser, updateUser);

//delete
router.delete("/:Id", verifyUser, deleteUser);

//get
router.get("/:Id",verifyUser, getUser);

//get all
router.get("/", verifyAdmin, getAllUser);


export default router