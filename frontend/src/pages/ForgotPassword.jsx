import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { backendUrl } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendUrl}/api/users/forgot-password`,
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" flex items-center justify-center mt-10 mb-50">
    <form  className="w-[300px]  flex flex-col gap-3"onSubmit={handleSubmit}>
      <h2 className="text-center" >Forgot Password</h2>

      <input className="border"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button  className="bg-gray-200 hover:bg-gray-500"type="submit">Send Reset Link</button>
    </form>
    </div>
  );
};

export default ForgotPassword;
