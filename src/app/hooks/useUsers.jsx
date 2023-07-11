/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import userService from "../../app/services/user.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../app/store/authSlicer";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getUser(user._id).then((content) => {
        dispatch(setUser(content));
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getUser(id) {
    console.log(id);
    try {
      setLoading(true);
      let { content } = await userService.get(id);
      setLoading(false);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function updateUser({ id, ...data }) {
    try {
      setLoading(true);
      let { content } = await userService.update(id, data);
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
