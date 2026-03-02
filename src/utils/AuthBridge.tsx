import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthBridge() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const rawToken = params.get("token");
    const token = rawToken ? decodeURIComponent(rawToken) : null;

    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/dashboard", { replace: true });
    }
  }, [params, navigate]);

  return (
    <div className="mt-5">
      <p className="text-center">Authenticating...</p>
    </div>
  );
}

