import { useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import signup_background from "../assets/signup_background.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [errorMessage, seterrorMessage] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const submitData = async () => {
    setData({
      username: "",
      password: "",
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/user/auth/register",
        data
      );
      if (response.status === 201) {
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
      seterrorMessage({ message: error.message, code: error.code });
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-between  signupPage">
      <div className="bg-[#fafcfc] border  h-[100vh] max-md:mx-[0.5rem] flex justify-center  items-center p-[3rem]  w-full">
        <div className="flex flex-col gap-[2.12rem]">
          {/* Heading */}
          <div className="space-y-[0.62rem]">
            <h1 className="text-[#11142D] text-[2.312rem] font-[700] bg-gradient-to-r from-[#475be8] via-[#475be8] to-[#D67D3E]  bg-clip-text text-transparent">
              Sign Up Here
            </h1>
            <p className="font-400 text-[#808191]">
              Welcome back! Please enter your details.
            </p>
            {errorMessage && (
              <div className="text-slate-100 text-center bg-red-600 p-[1rem] rounded-[1rem]">
                {errorMessage.code}
                {errorMessage.message}
              </div>
            )}
          </div>
          {/* User Informations */}
          <div className="flex flex-col w-full gap-[2rem] ">
            <InputComponent
              name={"Username"}
              id={"username"}
              data={data}
              setData={setData}
              type={"text"}
            />
            <InputComponent
              name={"Password"}
              id={"password"}
              type={"password"}
              setData={setData}
              data={data}
            />
            <div onClick={submitData}>
              <ButtonComponent color={"#475BE8"}>Sign Up</ButtonComponent>
            </div>
            <p
              className="font-400 text-[#808191] cursor-pointer underline text-center"
              onClick={() => navigate("/user/login")}
            >
              Sign In to your account here.
            </p>
          </div>
        </div>
      </div>
      <img
        src={signup_background}
        alt=""
        className="max-md:hidden  top-0 md:w-[50%] object-cover"
      />
    </div>
  );
};

export default Signup;