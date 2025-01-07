"use server"

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const isEmailUnique = async (email: string): Promise<boolean> => {
  try {
    const user = await db.user.findFirst({
        where: {
          email,
        },
      });
      return !user;
  } catch (error) {
    return true;
  }
};

export default isEmailUnique;