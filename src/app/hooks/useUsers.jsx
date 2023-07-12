/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import userService from "../../app/services/user.service";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUser(id) {
    try {
      setLoading(true);
      let { content } = await userService.get(id);
      setLoading(false);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function updateUser(data) {
    try {
      setLoading(true);
      let { content } = await userService.update(data);
      setLoading(false);
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
    <UserContext.Provider value={{ getUser, isLoading, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
