import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Components
import { Search, Loader2, Clock, Star, XCircle } from "lucide-react";

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

// Hooks
// import { useFavorites } from "@/hooks/use-favorite"
import { useLocationSearch } from "@/hooks/use-weather";
// import { useSearchHistory } from "@/hooks/use-search-history";
import { useDebounce } from "@/hooks/use-debounce";

export function CitySearch() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const debouncedValue = useDebounce(query, 1000); // waits 500ms after last keypress
    const { data: locations, isLoading } = useLocationSearch(debouncedValue);

    // const { favorites } = useFavorites();
    // const { history, clearHistory, addToHistory } = useSearchHistory();

    const handleSelect = (cityData: string) => {
        // const [lat, lon, name, country] = cityData.split("|");
        // // Add to search history
        // addToHistory.mutate({
        //     query,
        //     name,
        //     lat: parseFloat(lat),
        //     lon: parseFloat(lon),
        //     country,
        // });
        // setOpen(false);
        // navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };

    return (
        <>
            <Button
                variant='outline'
                className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
                onClick={() => setOpen(true)}
            >
                <Search className='mr-2 h-4 w-4' />
                Search cities...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput placeholder='Search cities...' value={query} onValueChange={setQuery} />
                    <CommandList>
                        {isLoading && (
                            <div className='flex items-center justify-center p-4'>
                                <Loader2 className='h-4 w-4 animate-spin' />
                            </div>
                        )}

                        {locations?.length === 0 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}

                        {/* Search Results */}
                        <CommandSeparator />
                        {locations && locations.length > 0 && !isLoading && (
                            <CommandGroup heading='Suggestions'>
                                {locations?.map((location) => (
                                    <CommandItem
                                        key={`${location.lat}-${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Search className='mr-2 h-4 w-4' />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className='text-sm text-muted-foreground'>, {location.state}</span>
                                        )}
                                        <span className='text-sm text-muted-foreground'>, {location.country}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
