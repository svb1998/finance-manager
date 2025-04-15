import "./Login.css";

import Logo from "../../assets/logo.svg";

import { useForm } from "react-hook-form";
import MainInput from "../../components/Input/MainInput/MainInput";
import MainButton from "../../components/Button/MainButton/MainButton";
import { useState } from "react";
import { login } from "./Login.service";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router";

import { motion } from "motion/react";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [animationKey, setAnimationKey] = useState(0);

    const handleFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent, data: any) => {
        e.preventDefault();
        try {
            const response = await login(data);
            console.log(response);
            navigate("/dashboard");
        } catch (error) {
            const err = error as Error;
            setErrorMessage(err.message);
            setAnimationKey((prev) => prev + 1);
        }
    };

    return (
        <div className="login-container">
            <motion.div
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
                initial={{ opacity: 0, y: 10 }}
                // whileInView={{ opacity: 1 }}
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
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    required
                    onChange={(e) => handleFormField(e)}
                />
                <MainButton type="submit">Iniciar sesión</MainButton>
            </motion.form>

            <div className="login-error-wrapper">
                {errorMessage && (
                    <motion.div
                        key={animationKey}
                        // initial={{ x: 0 }}
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
    );
}
