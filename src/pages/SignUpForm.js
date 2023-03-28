import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import "react-toastify/dist/ReactToastify.css";

import * as Yup from "yup";

const SignUpForm = () => {
  const navigate = useNavigate();
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const notify = () => {
    toast("Register your Account...", {
      position: "top-center",
      autoClose: 4000,
      theme: "dark",
    });
  };

  const formSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    password: Yup.string()
      .matches(passwordRules, { message: "Provide Valid Password" })
      .required("Please enter the required field"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(input) {
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (
      input.phone === loggeduser.phone &&
      input.password === loggeduser.password
    ) {
      navigate("/home");
    } else {
      notify();
    }
    return false;
  }

  return (
    <div className="container mt-5 col-md-4">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {/* Phone */}
          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            {...register("phone")}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
          {/* Password */}
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              notify();
            }}
          >
            Login
          </button>
          <ToastContainer />
        </div>

        <div style={{ margin: "0px 40px", font: "bold" }}>
          Do you Have An Account ?
          <Nav.Item>
            <Nav.Link className="text-primary" href="/register">
              Register
            </Nav.Link>
          </Nav.Item>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
