import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { fetchUser } from './Requests/AuthRequests';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZW1haWwiOiJwZXRlcnNvbi5vbGFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJqdGkiOiI0YzI4ZDhlMy0wMzJhLTRiYjAtYjdlZC1kOGM5MTAyYzlmYWQiLCJleHAiOjE3NjY4NjAzNzAsImlzcyI6IkNsZWFyVHJ1c3RBZnJpY2EiLCJhdWQiOiJDbGVhclRydXN0QWZyaWNhVXNlcnMifQ.dm-dkkaRxIPZ95eN_vYoEzAIfEW2tQxnJXiC9Ne2E0E"

export const RequireLogin = ({ children }: { children: React.ReactNode }) => {
  const { user, loadUser } = useAuth();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', token);
      }
      const user_token = localStorage.getItem('accessToken');
      if (!user_token) {
        return
      };

      fetchUser(user_token)
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              loadUser(data.user);
            });
          }
        }).catch((err) => {
          console.log(err);
        })
        .finally(() => { setUserChecked(true); }
        )
    } else {
      setUserChecked(true);
    }
  }, [user, loadUser])

  if (!user && userChecked) {
    // window.location.replace("http://localhost:5174/xt/login")
  }
  return children;
}
