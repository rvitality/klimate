import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider.tsx";

// Components
import { Layout } from "./components/layout.tsx";

// Pages
import WeatherDashboard from "./pages/weather-dashboard.tsx";
import CityPage from "./pages/city-page.tsx";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <Layout>
                    <Routes>
                        <Route path='/' element={<WeatherDashboard />} />
                        <Route path='/city/:cityName' element={<CityPage />} />
                    </Routes>
                </Layout>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
