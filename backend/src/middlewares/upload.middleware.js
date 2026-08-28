import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    callback(null, true);
    return;
  }

  callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 },
});
