"use server"

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

interface College {
  id: string;
  name: string;
  location: string;
}

interface CollegeResponse {
  success: boolean;
  message: string;
  data: College | null;
}

const addNewCollege = async (
  name: string,
  location: string
): Promise<CollegeResponse> => {
  try {
    const college = await db.college.create({
      data: {
        name,
        location,
      },
      select: {
        id: true,
        name: true,
        location: true,
      },
    });
    return {
      success: true,
      message: "College added successfully",
      data: college,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred",
      data: null,
    };
  }
};

export default addNewCollege;
