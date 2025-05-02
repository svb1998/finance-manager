import "./Login.css";

import Logo from "../../assets/logo.svg";

import { useState } from "react";
import { useNavigate } from "react-router";
import MainButton from "../../components/Button/MainButton/MainButton";
import MainInput from "../../components/Input/MainInput/MainInput";
import { login } from "./Login.service";

import { Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { setLocalStorage } from "../../utilities/localStorage.utility";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [animationKey, setAnimationKey] = useState(0);

    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent, data: any) => {
        e.preventDefault();
        try {
            const response = await login(data);
            // console.log(response);
            setLocalStorage("fm_tk", response.token);
            navigate("/dashboard");
        } catch (error) {
            const err = error as Error;
            setErrorMessage(err.message);
            setAnimationKey((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className="login-container">
                <motion.div
                    style={{ zIndex: 1 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: [-10, 5, 0] }}
                    transition={{
                        y: {
                            duration: 1,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <img className="login-logo" src={Logo} alt="" />
                </motion.div>

                <motion.form
                    style={{ zIndex: 1 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [10, -5, 0] }}
                    transition={{
                        y: {
                            duration: 1,
                            ease: "easeInOut",
                        },
                    }}
                    className="login-form-container"
                    onSubmit={(e) => onSubmit(e, formData)}
                >
                    <MainInput
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        onChange={(e) => handleFormField(e)}
                    />

                    <MainInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        name="password"
                        required
                        onChange={(e) => handleFormField(e)}
                        endIcon={
                            <div
                                style={{
                                    cursor: "pointer",
                                    color: "currentColor",
                                }}
                            >
                                {showPassword ? (
                                    <Eye
                                        onClick={() =>
                                            handlePasswordVisibility()
                                        }
                                        style={{ color: "currentColor" }}
                                        className="login-eye"
                                    />
                                ) : (
                                    <EyeOff
                                        onClick={() =>
                                            handlePasswordVisibility()
                                        }
                                        style={{ color: "currentColor" }}
                                        className="login-eye"
                                    />
                                )}
                            </div>
                        }
                    />

                    <MainButton type="submit">Iniciar sesión</MainButton>
                </motion.form>

                <div className="login-error-wrapper">
                    {errorMessage && (
                        <motion.div
                            key={animationKey}
                            animate={{ x: [0, 1, -1] }}
                            transition={{
                                duration: 0.2,
                                repeat: 3,
                                repeatType: "loop",
                            }}
                            className="login-error-container"
                        >
                            <span>{errorMessage}</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
