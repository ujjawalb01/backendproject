// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

//   api_key: process.env.CLOUDINARY_API_KEY,

//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     //upload the file on cloudinary
//     const response = await cloudinary.v2.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded succesfully
//     console.log("File is uploaded on cloudinary", response.url);
//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// export { uploadOnCloudinary };

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      // console.log("No local file path provided");
      return null;
    }

    console.log("Uploading file to Cloudinary:", localFilePath);

    // ✅ Correct usage
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("✅ File uploaded to Cloudinary:", response.url);

    // ✅ Delete local file safely
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};
