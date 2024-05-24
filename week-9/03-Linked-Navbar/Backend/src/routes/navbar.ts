import express from "express";
import { Statuscode } from "../statuscodes";
import { Navbar, User } from "../db";
import { middleware } from "./middleware";
import { navbar } from "../zod";
const NavRouter = express.Router();

NavRouter.get('/',middleware,async(req,res)=>{

    const user = await User.findOne({username:req.userid});
    const nav = await Navbar.findOne({UserID: user?._id});
    res.status(200).json({msg: Statuscode.code200, payload: nav});
})

NavRouter.put('/',middleware, async(req,res)=>{
    const { success } = navbar.safeParse(req.body);
    if(!success) return res.status(400).json({msg: Statuscode.code400});
    
    const user = await User.findOne({username:req.userid});
    const nav = await Navbar.updateOne({UserID: user?._id},{
        Home:req.body.Home,
        Notification: req.body.Notification,
        Messages: req.body.Messages,
        Connections: req.body.Connections,
    });
    if(!nav.acknowledged) return res.status(500).json({msg: Statuscode.code500});
    res.status(200).json({msg: Statuscode.code200});

})

export default NavRouter;