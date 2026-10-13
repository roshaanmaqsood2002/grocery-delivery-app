import express from "express";
import auth from "../middlewares/auth.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

uploadRouter.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file || req.file.size === 0) {
      return res.status(400).json({ message: "No image file provided or file is empty" });
    }

    const result = await new Promise<any>((resolve, reject) => {
   cloudinary.uploader.upload_stream(
  { folder: "grocery-del", resource_type: "image", timeout: 120000 },
  (err, uploaded) => (err ? reject(err) : resolve(uploaded)),
)
        .end(req.file!.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message || "Upload failed" });
  }
});

export default uploadRouter;