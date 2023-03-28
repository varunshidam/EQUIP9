import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Registeration = () => {
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const formSchema = Yup.object().shape({
    fname: Yup.string()
      .required("Please enter the required field")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "Length must be greater than 3"),

    lname: Yup.string()
      .required("Please enter the required field")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "Length must be greater than 3"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    name: Yup.string()
      .required("Please enter the required field")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "length must be greate than 3"),
    email: Yup.string()
      .required("Please enter the required field")
      .email("Email is invalid"),
    password: Yup.string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Please enter the required field"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  function onSubmit(input) {
    console.log(JSON.stringify(input, null, 4));
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/");
    return false;
  }
  return (
    <div className="container mt-5  col-md-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {/* FirstName */}
          <label>First Name</label>
          <input
            name="fname"
            type="text"
            {...register("fname")}
            className={`form-control ${errors.fname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.fname?.message}</div>
          {/* last NAme  */}
          <label>Last Name</label>
          <input
            name="lname"
            type="text"
            {...register("lname")}
            className={`form-control ${errors.fname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lname?.message}</div>
          {/* Phone */}
          <label>Phone Number</label>
          <input
            name="phone"
            type="text"
            {...register("phone")}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
          {/* Username */}
          <label>Username</label>
          <input
            name="name"
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
          {/* Email */}
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <div style={{ margin: "0px 40px", font: "bold" }}>
        Already Have An Account ?
        <Nav.Item>
          <Nav.Link className="text-primary" href="/">
            Login
          </Nav.Link>
        </Nav.Item>
      </div>
    </div>
  );
};

export default Registeration;
