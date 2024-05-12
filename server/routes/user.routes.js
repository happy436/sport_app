import express from "express";
import auth from "../middleware/auth.middleware.js"
/* const User = require("../models/User"); */

const router = express.Router({ mergeParams: true });

router.patch("/:userId", async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})
router.get("/:userId", auth, async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

export default router;