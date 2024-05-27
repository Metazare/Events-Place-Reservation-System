import express from "express";
import asynchronousHandler from '../../middlewares/asynchronousHandler';
import { Router } from 'express';
import { getConversations, getMessages, sendMessage } from "./message.controller";

const router = Router();

router.get("/", asynchronousHandler(getMessages));
router.get("/messages", asynchronousHandler(getMessages));
router.get("/conversations", asynchronousHandler(getConversations));
router.post("/send", asynchronousHandler(sendMessage));

export default router;