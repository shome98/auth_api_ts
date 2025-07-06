import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;