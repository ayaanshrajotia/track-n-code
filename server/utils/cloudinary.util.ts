import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { v4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const unlinkFile = promisify(fs.unlink); // Convert fs.unlink to a Promise

// Function to upload a file to Cloudinary
export const uploadOnCloudinary = async (file: File, folder: string = "") => {
  const tempDir = path.resolve("../uploads");
  const localFilePath = path.join(tempDir, v4() + file.name);

  try {
    if (!file) throw new Error("No file provided");

    // Save file temporarily
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(localFilePath, buffer);

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder,
    });

    // Remove the temporary file
    await unlinkFile(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // Cleanup: Remove temp file if exists
    try {
      if (fs.existsSync(localFilePath)) await unlinkFile(localFilePath);
    } catch (cleanupError) {
      console.error("Failed to remove temp file:", cleanupError);
    }

    return null;
  }
};

// Function to delete a file from Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    if (!publicId) throw new Error("No public_id provided");

    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== "ok") {
      throw new Error(`Failed to delete image: ${response.result}`);
    }

    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
