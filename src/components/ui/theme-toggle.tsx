import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    const handleToggleTheme = () => setTheme(isDark ? "light" : "dark");

    const toggleIcon = isDark ? (
        <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' />
    ) : (
        <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all' />
    );

    return (
        <button
            onClick={handleToggleTheme}
            className={`${
                isDark ? "rotate-180" : "rotate-0"
            } flex items-center cursor-pointer transition-transform duration-500`}
        >
            {toggleIcon}
        </button>
    );
};

export default ThemeToggle;
