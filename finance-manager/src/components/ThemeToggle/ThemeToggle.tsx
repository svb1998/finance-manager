import React, { useEffect } from "react";
import "./ThemeToggle.css";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [currentTheme, setCurrentTheme] = React.useState<"dark" | "light">(
        "dark"
    );

    useEffect(() => {
        document.body.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            setCurrentTheme(savedTheme);
        }
    }, []);

    return (
        <div className="theme-toggle-container">
            <div
                role="button"
                onClick={() =>
                    setCurrentTheme(currentTheme === "dark" ? "light" : "dark")
                }
                className="theme-toggle-button"
            >
                {currentTheme === "dark" ? <Moon /> : <Sun />}
            </div>
        </div>
    );
}
