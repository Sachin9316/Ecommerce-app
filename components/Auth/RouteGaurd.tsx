import { useRouter } from "expo-router";
import { Route } from "expo-router/build/Route";
import { useEffect } from "react";

function RouteGaurd({ children }: any) {
    const authToken = localStorage.getItem('authToken');
    const router = useRouter();

    const validation = () => {
        if (!authToken) {
            return router.replace(Route.auth);
        }
    }

    useEffect(validation, [authToken]);

    return children;

}

export default RouteGaurd;