import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", asyncHandler(register));

export default router;