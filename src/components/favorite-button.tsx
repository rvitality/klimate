import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Types
import type { WeatherData } from "@/api/types";

// Hooks
import { useSearchFavorites } from "@/hooks/use-search-favorites";

interface FavoriteButtonProps {
    data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
    const { addFavorite, removeFavorite, isFavorite } = useSearchFavorites();
    const isCurrentlyFavorite = isFavorite(`${data.coord.lat}-${data.coord.lon}`);

    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            const cityId = `${data.coord.lat}-${data.coord.lon}`;
            removeFavorite.mutate(cityId);
            toast.success(`Removed ${data.name} from Favorites.`);
        } else {
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites.`);
        }
    };

    return (
        <Button
            variant={isCurrentlyFavorite ? "default" : "outline"}
            size='icon'
            onClick={handleToggleFavorite}
            className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
        >
            <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
        </Button>
    );
}
