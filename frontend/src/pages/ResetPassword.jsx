import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendUrl}/api/users/reset-password/${token}`,
        { password }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Invalid or expired link");
    }
  };

  return (
  <div className=" flex items-center justify-center mt-10 mb-50">
    <form className="w-[300px]  flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-center">Reset Password</h2>

      <input className="border"
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="bg-gray-200 hover:bg-gray-500" type="submit">Reset Password</button>
    </form>
    </div>
  );
};

export default ResetPassword;
