import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";

const RegisterationForm = () => {
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const formSchema = Yup.object().shape({
    // name
    name: Yup.string()
      .required("Please enter the required field")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "Length must be greater than 3"),
    // username
    username: Yup.string()
      .required("Please enter the required field")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .min(3, "Length must be greater than 3"),
    // email
    email: Yup.string().required("Email is required").email("Email is invalid"),
    // phone
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(8, "Min 8 numbers "),

    password: Yup.string()
      .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Please enter the required field"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    console.log("data", data);
    await axios.post("http://localhost:3001/users", data);
    navigate("/");
    // alert("Added Succ...");
  };
  return (
    <div>
      <div className="container mt-5  col-md-4">
        <h1>Add User Information</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            {/* Name  */}
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>

            {/* user nme  */}
            <label>User Name</label>
            <input
              name="username"
              type="text"
              {...register("username")}
              className={`form-control ${errors.fname ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>

            {/* Email */}
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>

            {/* Phone Number */}
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterationForm;
