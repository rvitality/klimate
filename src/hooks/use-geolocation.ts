import { useEffect, useState } from "react";
import { Coordinates } from "@/api/types";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

const useGeolocation = () => {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: null,
                isLoading: true,
            });

            return;
        }

        const successLocationData = (position) => {
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                error: null,
                isLoading: false,
            });
        };

        const errorLocationData = (error) => {
            let errorMessage: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please enable location access.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
            }

            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false,
            });
        };

        const locationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(successLocationData, errorLocationData, locationOptions);
    };

    // Get location on component mount
    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation, // Expose method to manually refresh location
    };
};

export default useGeolocation;
