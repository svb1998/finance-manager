import "./App.css";
import Logo from "./assets/logo.svg";

import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { motion } from "motion/react";

const PlatformLayout = lazy(
    () => import("./layouts/PlatformLayout/PlatformLayout")
);
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Groups = lazy(() => import("./pages/Groups/Groups"));
const Login = lazy(() => import("./pages/Login/Login"));

function App() {
    const Fallback = () => (
        <motion.div
            initial={{
                background:
                    "radial-gradient(circle ,rgb(0, 0, 0) 1%,rgb(0, 0, 0))",
            }}
            animate={{
                background:
                    "radial-gradient(circle ,rgb(0, 31, 25) 1%,rgb(0, 0, 0))",
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatType: "reverse",
            }}
            className="fallback-container"
        >
            <motion.div
                initial={{ scale: 1 }}
                animate={{
                    scale: [1, 1.1, 1, 1, 1.1, 1],
                }}
                transition={{
                    scale: {
                        duration: 1.8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    },
                }}
            >
                <img className="fallback-logo" src={Logo} alt="" />
            </motion.div>
        </motion.div>
    );

    return (
        <BrowserRouter>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    //TODO: Use when Login is implemented
                    {/* <Route path="/" element={<PlatformLayout />}>
                    <Route index path="dashboard" element={<Dashboard />} />
                    <Route path="groups" element={<Settings />} />
                    <Route path="settings" element={<Settings />} />
                    <Route
                        path="*"
                        element={<Navigate replace to="/dashboard" />}
                    />
                </Route> */}
                </Routes>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />

                    <Route path="/" element={<PlatformLayout />}>
                        <Route index path="dashboard" element={<Dashboard />} />
                        <Route path="groups" element={<Groups />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    <Route
                        path="*"
                        element={<Navigate replace to="/dashboard" />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
