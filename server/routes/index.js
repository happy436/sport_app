import express from "express";
import userRouter from "./user.routes.js"
import authRouter from "./auth.routes.js"

const router = express.Router({ mergeParams: true });

router.use("/auth", authRouter)
router.use("/user", userRouter)
// router.use("/measurement", measurementRoutes)
// router.use("/workout", workoutRoutes)
// router.use("/nutrition", nutritionRoutes)

export default router;