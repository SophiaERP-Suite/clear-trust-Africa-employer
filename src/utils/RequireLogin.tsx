import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { fetchUser } from './Requests/AuthRequests';

export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
  const { user, loadUser } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZW1haWwiOiJwZXRlcnNvbi5vbGFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4gLSBPcmdhbmlzYXRpb24iLCJqdGkiOiJkOTdjYzVkYS0xOTFiLTQ4YzktYTg0ZC0zYWNkYTM0MzY1ZGQiLCJleHAiOjE3NjkyNTg0NzcsImlzcyI6IkNsZWFyVHJ1c3RBZnJpY2EiLCJhdWQiOiJDbGVhclRydXN0QWZyaWNhVXNlcnMifQ.xCe-IGho894tMUdYuDK_s0st73xIQFQPFa-PgUNPGHc";
    if (!token) {
      setCheckingAuth(false);
      window.location.replace("https://cleartrustafrica.com/xt/login");
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
        window.location.replace("https://cleartrustafrica.com/xt/login");
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
