import express from "express"
import { createStripePaymentIntent, createTransaction, listTransactions } from "../controllers/transactionController"
import { getUserCourseProgress, getUserEnrolledCourses } from "../controllers/userCourseProgressController"

const router = express.Router()

router.get("/:userId/enrolled-courses", getUserEnrolledCourses)
router.get("/:userId/courses/:courseId", getUserCourseProgress)
router.put("/:userId,courses/:courseId", createStripePaymentIntent);

export default router