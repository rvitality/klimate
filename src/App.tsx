import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Components
import { Layout } from "./components/layout.tsx";
import { Toaster } from "./components/ui/sonner";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});
// Pages
import WeatherDashboard from "./pages/weather-dashboard.tsx";
import CityPage from "./pages/city-page.tsx";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<WeatherDashboard />} />
                            <Route path='/city/:cityName' element={<CityPage />} />
                        </Routes>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </Layout>
                    <Toaster richColors />
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
