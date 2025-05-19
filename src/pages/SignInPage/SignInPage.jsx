import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (err) {
      console.error("Ошибка входа:", err);
    }
  };

  return (
    <div className="sign-in-wrapper">
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>

        <label>
          Email address
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>

        <label>
          Password
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>

        <button type="submit">Login</button>

        <div className="footer">
          Don’t have an account? <a href="/sign-up">Sign Up.</a>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
