import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

interface College {
    id: string;
    name: string;
    location: string;
}

interface CollegeResponse {
    success: boolean;
    data: College[];
}

const getListOfColleges = async (): Promise<CollegeResponse> => {
    try {
        const colleges = await db.college.findMany({
        select: {
            name: true,
            location: true,
            id: true,
        },
        });
        return {
            success: true,
            data: colleges,
        };
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    }
}

export default getListOfColleges;