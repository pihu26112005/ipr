import { storage, BUCKET_ID, ID } from "./appwriteConfig";

export const uploadImage = async (file) => {
  if (!file) return null;

  try {
    const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return storage.getFileView(BUCKET_ID, response.$id);
  } catch (err) {
    console.error("Image upload failed:", err.message);
    return null;
  }
};
