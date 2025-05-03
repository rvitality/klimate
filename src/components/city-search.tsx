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

    const debouncedValue = useDebounce(query, 500); // waits 500ms after last keypress
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
                        {/* {query.length > 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>} */}
                        <CommandGroup heading='Suggestions'>
                            <CommandItem>Calendar</CommandItem>
                            <CommandItem>Search Emoji</CommandItem>
                            <CommandItem>Calculator</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading='Settings'>
                            <CommandItem>Profile</CommandItem>
                            <CommandItem>Billing</CommandItem>
                            <CommandItem>Settings</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
