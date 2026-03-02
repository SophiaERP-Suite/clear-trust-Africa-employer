// import { useEffect, useState } from 'react';
// import { useAuth } from './useAuth';
// import { fetchUser } from './Requests/AuthRequests';

// export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
//   const { user, loadUser } = useAuth();
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZW1haWwiOiJvc2VzZWJhZ2ExM0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBcHBsaWNhbnQgLSBPcmdhbmlzYXRpb24iLCJqdGkiOiI0MGMzMGNhOS0xNWExLTQ2YjktODMyMi0zNWUzNDcwNWNiNmYiLCJleHAiOjE3NzIzMTUwMDIsImlzcyI6IkNsZWFyVHJ1c3RBZnJpY2EiLCJhdWQiOiJDbGVhclRydXN0QWZyaWNhVXNlcnMifQ.L_AWp5d2E1xJMf0IIT9q8YRnanIQRggrZm2OGUl0taY";
//     if (!token) {
//       setCheckingAuth(false);
//       window.location.replace("https://cleartrustafrica.com/xt/login");
//       return;
//     }

//     if (user) {
//       setCheckingAuth(false);
//       return;
//     }

//     fetchUser(token)
//       .then((res) => {
//         if (res.status === 200) {
//           return res.json();
//         }
//         throw new Error("Unauthorized");
//       })
//       .then((data) => {
//         localStorage.setItem("accessToken", token);
//         loadUser(data.user);
//       })
//       .catch((err) => {
//         console.error(err);
//         localStorage.removeItem("accessToken");
//         window.location.replace("https://cleartrustafrica.com/xt/login");
//       })
//       .finally(() => {
//         setCheckingAuth(false);
//       });
//   }, []);

//   if (checkingAuth) {
//     return null;
//   }

//   return <>{children}</>;
// };




// export const RequireLogin = ({ children }: { children: React.ReactNode }) => {

//   return <>{children}</>;
// };


import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { fetchUser } from './Requests/AuthRequests';

export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
  const { user, loadUser } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

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
        if (res.status === 200) return res.json();
        throw new Error("Unauthorized");
      })
      .then((data) => {
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

  if (checkingAuth) return null;

  return <>{children}</>;
};