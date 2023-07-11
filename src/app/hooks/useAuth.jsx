import React, { useContext, useEffect, useState } from "react";
import userService from "../../app/services/user.service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { setTokens } from "../services/localStorage.service";
import { httpAuth } from "../services/http.service";
import { useDispatch } from "react-redux";
import { setSignIn } from "../store/authSlicer";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        password,
        ...rest,
      });
      dispatch(setSignIn());
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с такой электронной почтой уже существует",
          };
          throw errorObject;
        }
        if (
          message === "WEAK_PASSWORD : Password should be at least 6 characters"
        ) {
          const errorObject = {
            password: "Минимальная длинна 6 символов",
          };
          throw errorObject;
        }
        if (message === "INVALID_EMAIL") {
          const errorObject = {
            email: "Проверьте корректность электронной почты",
          };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Проверьте пароль",
          };
          throw errorObject;
        }
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Проверьте email",
          };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider value={{ isLoading, signUp, signIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
