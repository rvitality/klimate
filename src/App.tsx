import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider.tsx";

// Components
import { Layout } from "./components/layout.tsx";
import { Button } from "@/components/ui/button";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <Layout>
                    <div className='flex flex-col items-center justify-center min-h-svh'>
                        <Button>Click me</Button>
                    </div>
                </Layout>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
