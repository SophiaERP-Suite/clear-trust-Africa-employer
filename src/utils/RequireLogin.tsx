import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { fetchUser } from "./Requests/AuthRequests";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBjbGVhcnRydXN0YWZyaWNhLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwianRpIjoiNGQ3NWZkZTMtOGJkOC00YmYxLTkwMWMtNjQxNmVmMjEyYmRiIiwiZXhwIjoxNzY4NjYxNzc0LCJpc3MiOiJDbGVhclRydXN0QWZyaWNhIiwiYXVkIjoiQ2xlYXJUcnVzdEFmcmljYVVzZXJzIn0.F0lJYcOUNwpNTDNoK6O3xlgI1xHzoONrDCkVAheMExM";

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
