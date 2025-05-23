import { Request, Response } from "express";
import { clerkClient } from "../index";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const userData = req.body;
  try {
        console.log("Update user request:", { userId, userData }); // Log dữ liệu gửi lên

    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });
        console.log("Updated user from Clerk:", user); // Log dữ liệu trả về từ Clerk


    res.json({ message: "User updated successfully", data: user });
  } catch (error) {
        console.error("Error updating user:", error); // Log lỗi nếu có

    res.status(500).json({ message: "Error updating user", error });
  }
};