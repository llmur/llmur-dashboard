import {getCurrentUserSession} from "@/lib/auth";

export const getCurrent = async () => {
    try {
        return await getCurrentUserSession();
    }
    catch (error) {
        return null;
    }
}