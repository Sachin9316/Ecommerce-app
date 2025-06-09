import { getItem } from "@/utils/AsyncStorage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: any) {
    const router = useRouter();

    const validateAuth = async () => {
        console.log("Checking auth...");
        const token = await getItem('authToken');
        console.log({ token });

        if (!token) {
            console.log("User is authenticated, redirecting...");
            router.replace('/login/PhoneNumberLoginScreen');
        } else {
            console.log("No token, allow access");
        }

    };

    useEffect(() => {
        validateAuth();
    }, []);

    return children;
}

export default RouteGuard;
