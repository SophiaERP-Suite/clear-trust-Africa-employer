import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { fetchUser } from "./Requests/AuthRequests";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBjbGVhcnRydXN0YWZyaWNhLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIC0gT3JnYW5pc2F0aW9uIiwianRpIjoiNDFlNzYzYzItODNiYi00ZGQ3LWFiNWItOTI1M2RlN2MxMTRhIiwiZXhwIjoxNzY5MjU3MjAzLCJpc3MiOiJDbGVhclRydXN0QWZyaWNhIiwiYXVkIjoiQ2xlYXJUcnVzdEFmcmljYVVzZXJzIn0.FFwQD54A_pRdyg7d2D1oW9I6eK-9N4EUNyv_S9i_EAA";

export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
  const { user, loadUser } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!token) {
      setCheckingAuth(false);
      window.location.replace("http://localhost:5174/xt/login");
      return;
    }

    if (user) {
      setCheckingAuth(false);
      return;
    }

    fetchUser(token)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Unauthorized");
      })
      .then((data) => {
        localStorage.setItem("accessToken", token);
        loadUser(data.user);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("accessToken");
        window.location.replace("http://localhost:5174/xt/login");
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  if (checkingAuth) {
    return null;
  }

  return <>{children}</>;
};
