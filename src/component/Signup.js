import React, { useState } from "react";
// logo
// router dom
import { Link, useHistory } from "react-router-dom";
// util
import { customFetch } from "../util/customFetch";
// context
// import { UserContext } from "../context/UserContext";
import { Cascader } from "antd";
import { residences } from "../util/address";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().min(8).max(20).required(),
  password: yup.string().min(4).max(20).required(),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  acceptTerms: yup.bool().oneOf([true], "You must accept term & conditions!"),
});

// css
const mesStyleErr = {
  color: "#ff4d58",
};
const mesStyleFoc = {
  color: "#017FFF",
};
const inpStyleErr = {
  border: "0.5px solid #ff4d58",
  boxShadow: "0 0 0 5px #F8D7DA",
};
const inpStyleFoc = {
  border: "0.5px solid #017fff",
  boxShadow: "0 0 0 5px #bfdeff",
};

const Signup = () => {
  const history = useHistory();

  // * CHECK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // initialize error message state
  const [errorMessage, setErrorMessage] = useState("");

  // adress
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("* Address");
  const [addressLabelStyle, setAddressLabelStyle] = useState(mesStyleFoc);
  const onChangeCascaderAddress = (e) => {
    setAddressLabelStyle(mesStyleFoc);
    const newAddressArr = [...e];
    setAddress(`${newAddressArr[0]},${newAddressArr[1]},${newAddressArr[2]},`);
  };

  console.log(address);

  const checkUserName = async (userName) => {
    const URL = `/api/checkusername/${userName}`;
    try {
      const response = await customFetch(URL, "GET");
      if (!response.ok) {
        setErrorMessage(
          "Please check your Network-Connection or maybe our Server have problem!"
        );
        throw new Error("Problem post user");
      }
      const data = await response.json();
      console.log(data);
      console.log(typeof data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const submitFormSignup = async (e) => {
    console.log(e);
    console.log(e.username);
    const resultCheck = await checkUserName(e.username);
    if (resultCheck) {
      console.log("User đã tồn tại!");
      setErrorMessage("Username existed!");
    } else if (address === "") {
      setAddressError("Select your address!");
      setAddressLabelStyle(mesStyleErr);
    } else {
      console.log("User chưa đăng ký!");
      signupAction(e);
    }
  };

  // * signup action +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const signupAction = async (signupInput) => {
    const URL = "/api/users";
    const bodyContent = JSON.stringify({
      id: 0,
      username: `${signupInput.username}`,
      password: `${signupInput.password}`,
      phoneNumber: `${signupInput.phoneNumber}`,
      email: `${signupInput.email}`,
      address: `${address}`,
      verified: 0,
      roles: [{ id: 3 }],
    });

    try {
      const response = await customFetch(URL, "POST", bodyContent);
      if (!response.ok) {
        setErrorMessage(
          "Please check your Network-Connection or maybe our Server have problem!"
        );
        throw new Error("Problem post user");
      }
      const data = await response.json();
      console.log(data);
      // setRerenderUsernames(Math.random());
      history.push({
        pathname: "/login",
        state: {
          from: "/signup",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login signup">
      <div className="section_1">
        <div className="section_right">
          <form
            className="login_form"
            onSubmit={handleSubmit(submitFormSignup)}
          >
            <div className="login_form_header">
              <span className="title">Sign Up</span>
            </div>
            <div className="body">
              <div className="input_group">
                <p className="error_message" style={mesStyleErr}>
                  {errorMessage}
                </p>
                <label
                  className="error_message"
                  style={errors.username ? mesStyleErr : mesStyleFoc}
                >
                  {errors.username ? errors.username.message : "* Username"}
                </label>
                <input
                  name="username"
                  className="form_input"
                  style={errors.username ? inpStyleErr : inpStyleFoc}
                  {...register("username")}
                />
              </div>

              <div className="input_group">
                <label
                  className="error_message"
                  style={errors.password ? mesStyleErr : mesStyleFoc}
                >
                  {errors.password ? errors.password.message : "* Password"}
                </label>
                <input
                  name="password"
                  className="form_input"
                  type="password"
                  style={errors.password ? inpStyleErr : inpStyleFoc}
                  {...register("password")}
                />
              </div>

              <div className="input_group">
                <label
                  className="error_message"
                  style={errors.repassword ? mesStyleErr : mesStyleFoc}
                >
                  {errors.repassword
                    ? "Password does not match!"
                    : "* Confirm password"}
                </label>
                <input
                  name="repassword"
                  className="form_input"
                  type="password"
                  style={errors.repassword ? inpStyleErr : inpStyleFoc}
                  {...register("repassword")}
                />
              </div>

              <div className="input_group">
                <label
                  className="error_message"
                  style={errors.phoneNumber ? mesStyleErr : mesStyleFoc}
                >
                  {errors.phoneNumber
                    ? errors.phoneNumber.message
                    : "* Phone Number"}
                </label>
                <input
                  name="phoneNumber"
                  className="form_input"
                  style={errors.phoneNumber ? inpStyleErr : inpStyleFoc}
                  {...register("phoneNumber")}
                />
              </div>

              <div className="input_group">
                <label
                  className="error_message"
                  style={errors.email ? mesStyleErr : mesStyleFoc}
                >
                  {errors.email ? errors.email.message : "* Email"}
                </label>
                <input
                  name="email"
                  className="form_input"
                  style={errors.email ? inpStyleErr : inpStyleFoc}
                  {...register("email")}
                />
              </div>

              <div className="input_group">
                <label className="error_message" style={addressLabelStyle}>
                  {addressError}
                </label>
                <Cascader
                  defaultValue={["City", "District", "Street"]}
                  options={residences}
                  allowClear={false}
                  onChange={onChangeCascaderAddress}
                />
              </div>

              <div className="input_group input_group_terms">
                <label
                  className="acceptTerms"
                  style={errors.acceptTerms ? mesStyleErr : mesStyleFoc}
                >
                  {errors.acceptTerms
                    ? errors.acceptTerms.message
                    : "* Terms & Conditions"}
                </label>
                <div className="terms_checkbox">
                  <input
                    name="acceptTerms"
                    type="checkbox"
                    {...register("acceptTerms")}
                  />
                  <label htmlFor="acceptTerms">Accept terms & conditions</label>
                </div>
              </div>

              <button className="button_login" type="submit">
                Sign up
              </button>

              <div className="sub">
                <Link to="/login">Already have account? Sign in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
