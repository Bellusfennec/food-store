import React, { useContext, useEffect, useState } from "react";
import userService from "../../app/services/user.service";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function registartion(data) {
    try {
      setLoading(true);
      let { content } = await userService.checkEmail(data.email);
      const isValue = content.length > 0;
      if (isValue) {
        setInfo("Такой email уже используется");
        content = null;
      }
      if (!isValue) {
        data = { ...data, uuid: uuidv4() };
        content = await userService.create(data);
      }
      setLoading(false);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function login(data) {
    try {
      setLoading(true);
      let { content } = await userService.login(data.email, data.password);
      const isValue = content.length > 0;
      if (!isValue) {
        setInfo("Проверьте email или пароль");
      }
      setLoading(false);
      content = Array.isArray(content) ? content[0] : content;
      console.log("content", content);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <AuthContext.Provider
      value={{ isLoading, info, setInfo, registartion, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
