import "./Login.css";

import Logo from "../../assets/logo.svg";

import { useState } from "react";
import { useNavigate } from "react-router";
import MainButton from "../../components/Button/MainButton/MainButton";
import MainInput from "../../components/Input/MainInput/MainInput";
import { login } from "./Login.service";

import { Copy, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { ProfileData } from "../../models/platform/profileData.model";
import { setProfile } from "../../redux/states/profile";
import { useMutation } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

export default function Login() {
    const dispatch = useDispatch();
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

    const { mutateAsync: handleOnSubmit, isPending } = useMutation({
        mutationFn: async (data: any) => await login(data),
        onSuccess: (response) => {
            const profileData: ProfileData = {
                fm_u: response.profile.profileId,
                fm_n: response.profile.name,
            };

            dispatch(setProfile(profileData));

            localStorage.setItem("fm_tk", response.token);

            navigate("/dashboard");
        },
        onError: (error) => {
            setErrorMessage((error as Error).message);
            setAnimationKey((prev) => prev + 1);
        },
    });

    const onSubmit = async (e: React.FormEvent, data: any) => {
        e.preventDefault();
        handleOnSubmit(data);
    };

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text).then(() => {
            if (field === "username") {
                setFormData({ ...formData, email: text });
            } else if (field === "password") {
                setFormData({ ...formData, password: text });
            }
        });
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
                        defaultValue={formData.email ? formData.email : ""}
                        required
                        onChange={(e) => handleFormField(e)}
                    />

                    <MainInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        name="password"
                        defaultValue={
                            formData.password ? formData.password : ""
                        }
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

                    <MainButton type="submit">
                        {isPending ? (
                            <div>
                                <PulseLoader
                                    size={6}
                                    color="var(--color-button-text)"
                                />
                            </div>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </MainButton>
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
                <div>
                    <span className="login-footer">
                        <strong> Credenciales de la demo</strong>
                        <div className="login-footer-credentials">
                            <span className="login-footer-credentials-text">
                                Email: demo@test.com
                                <Copy
                                    onClick={() =>
                                        handleCopy("demo@test.com", "username")
                                    }
                                    className="login-copy-button"
                                    size={12}
                                />
                            </span>
                            <span className="login-footer-credentials-text">
                                Contraseña: Demo1!
                                <Copy
                                    onClick={() =>
                                        handleCopy("Demo1!", "password")
                                    }
                                    className="login-copy-button"
                                    size={12}
                                />
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        </>
    );
}
