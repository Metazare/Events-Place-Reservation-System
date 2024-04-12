import express from "express";
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import { Router } from 'express';
import { getMessages, sendMessage } from "./message.controller";

const router = Router();

router.get("/", asynchronousHandler(getMessages));
router.get("/conversations", asynchronousHandler(getMessages));
router.post("/send", asynchronousHandler(sendMessage));

export default router;