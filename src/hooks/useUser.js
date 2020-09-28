import { useCallback, useContext } from "react";
import UserContext from "context/UserContext";
import LoginService from "services/login";
export default function useUser() {
  const { jwt, setJWT } = useContext(UserContext);

  const login = useCallback(
    ({ username, password }) => {
      LoginService({ username, password })
        .then((jwt) => {
          setJWT(jwt);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    login,
    logout,
  };
}
