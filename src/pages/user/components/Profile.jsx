/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../app/store/authSlicer";
import Divider from "../../../common/components/ui/divider/Divider";
import { IconButton } from "../../../common/components/ui/form";
import style from "./Profile.module.scss";

const Profile = () => {
  const { userState } = useSelector((state) => state.auth);
  const { email } = userState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/passport/edit")}>
          <MdSettings />
        </IconButton>
      </div>
      <h3 className={style.label}>Профиль</h3>
      <Divider row="2" />
      <div>Email: {email}</div>
      <Divider row="2" />
      <button onClick={() => dispatch(setLogout())}>
        <MdLogout />
        Выход
      </button>
    </>
  );
};

export default Profile;
