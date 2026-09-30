import express from "express";
import admin from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";
import {
  assignDeliveryPartner,
  createDeliveryPartner,
  getAdminStats,
  getDeliveryPartners,
  udpateDeliveryPartner,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/stats", auth, admin, getAdminStats);
adminRouter.get("/delivery-partners", auth, admin, getDeliveryPartners);
adminRouter.get("/delivery-partners", auth, admin, createDeliveryPartner);
adminRouter.get("/delivery-partners/:id", auth, admin, udpateDeliveryPartner);
adminRouter.get("/orders/:id/assign", auth, admin, assignDeliveryPartner);

export default adminRouter;
