import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navbar } from "../../layout/Navbar";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserData = () => {
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

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
    // website
    website: Yup.string()
      .required("Please enter the required field")
      .min(3, "Length must be greater than 3"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log("data", data);
    await axios.post("http://localhost:3001/users", data);
    navigate("/home");
    // alert("Added Succ...");
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5  col-md-4">
        <h1>Add User Information</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            {/* Name  */}
            <label>First Name</label>
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

            {/* State */}
            <label>website</label>
            <input
              name="website"
              type="text"
              {...register("website")}
              className={`form-control ${errors.website ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.website?.message}</div>
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

export default AddUserData;
