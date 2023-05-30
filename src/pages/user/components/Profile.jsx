/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthLogout } from "../../../app/store/authSlicer";
import { getUserByUuidHTTP } from "../../../app/http/userHTTP";
import { Loading } from "../../../common/components/ui/loading";
import Divider from "../../../common/components/ui/divider/Divider";
import { IconButton } from "../../../common/components/ui/form";
import { MdLogout, MdSettings } from "react-icons/md";

const Profile = () => {
  const { userState } = useSelector((state) => state.auth);
  const { uuid } = userState;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await getUserByUuidHTTP(uuid);
      if (response.ok) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (uuid) {
      getUser();
    }
  }, [uuid]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && user && (
        <>
          <div className={style.back}>
            <IconButton
              type="button"
              onClick={() => navigate("/passport/edit")}
            >
              <MdSettings />
            </IconButton>
          </div>
          <h3 className={style.label}>Профиль</h3>
          <Divider row="2" />
          <div>Email: {user.email}</div>
          <Divider row="2" />
          <button onClick={() => dispatch(setAuthLogout())}>
            <MdLogout />
            Выход
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
