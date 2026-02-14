const express = require("express");
const { upload } = require("../middlewares/uploadMiddleware");
const { uploadImage } = require("../controllers/uploadController");
const router = express.Router();

router.post("/image", upload.single('image'), uploadImage);

const uploadRoutes = router;
module.exports = uploadRoutes