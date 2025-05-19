import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate("/"); // или /articles
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      // тут можно отобразить ошибку под полем
    }
  };
  return (
    <div className="sign-up-wrapper">
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new account</h2>

        <label>
          Username
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 chars" },
              maxLength: { value: 20, message: "Max 20 chars" },
            })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </label>

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
              minLength: { value: 6, message: "Min 6 chars" },
              maxLength: { value: 40, message: "Max 40 chars" },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </label>

        <label>
          Repeat Password
          <input
            type="password"
            {...register("repeatPassword", {
              required: "Please repeat password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.repeatPassword && (
            <p className="error">{errors.repeatPassword.message}</p>
          )}
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            {...register("agreeToTerms", {
              required: "You must agree to terms",
            })}
          />
          I agree to the processing of my personal information
        </label>
        {errors.agreeToTerms && (
          <p className="error">{errors.agreeToTerms.message}</p>
        )}

        <button type="submit">Create</button>

        <div className="footer">
          Already have an account? <a href="/sign-in">Sign In.</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
