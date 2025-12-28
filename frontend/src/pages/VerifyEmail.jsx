import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // ✅ correct
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/users/verify-email/${token}`
        );

        if (res.data.success) {
          toast.success("Email verified successfully 🎉");
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch {
        toast.error("Invalid or expired verification link");
        navigate("/");
      }
    };

    if (token) verifyEmail();
    else toast.error("Invalid verification link");
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Verifying your email...</h2>
      <p>Please wait</p>
    </div>
  );
};

export default VerifyEmail;
