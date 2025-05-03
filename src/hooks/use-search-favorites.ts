import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCityItem {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number;
}

export function useSearchFavorites() {
    const [favorites, setFavorites] = useLocalStorage<FavoriteCityItem[]>("search-favorite", []);

    const queryClient = useQueryClient();

    const favoritesQuery = useQuery({
        queryKey: ["search-favorite"],
        queryFn: () => favorites,
        initialData: favorites,
    });

    const addFavorite = useMutation({
        mutationFn: async (city: Omit<FavoriteCityItem, "id" | "addedAt">) => {
            const newFavorite: FavoriteCityItem = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now(),
            };

            // Prevent duplicates
            const exists = favorites.some((fav) => fav.id === newFavorite.id);
            if (exists) return favorites;

            const newFavorites = [...favorites, newFavorite];
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: (newFavorite) => {
            queryClient.setQueryData(["search-favorite"], newFavorite);
        },
    });

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const filteredFavorites = favorites?.filter((fav) => fav.id !== cityId) || [];

            setFavorites(filteredFavorites);
            return filteredFavorites;
        },
        onSuccess: (newFavorites) => {
            queryClient.setQueryData(["search-favorite"], newFavorites);
        },
    });

    const isFavorite = (coords: string) => {
        const dataIndex = favorites?.findIndex((fav) => {
            const latLon = `${fav.lat}-${fav.lon}`;
            return latLon === coords;
        });
        return dataIndex != -1;
    };

    return {
        favorites: favoritesQuery.data ?? [],
        addFavorite,
        removeFavorite,
        isFavorite,
    };
}
