import express from "express";
import  {teacherClasses, getTeacherById}  from "../controllers/teachersController.js";

// Import the necessary modules and controllers

const router = express.Router();
// Define the route for teacher classes

router.get("/:teacher_id", teacherClasses);
router.get("/teacher/:id", getTeacherById); // Assuming this is for getting a teacher by ID

// Export the router
export default router;