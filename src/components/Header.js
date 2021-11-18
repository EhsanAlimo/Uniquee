import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContextProvider } from "../context/StateProvider";
import LogoutIcon from '@mui/icons-material/Logout';
function Header() {
  const [{ user }, dispatch] = useContextProvider(); //  Import all user information from database from reducer.js

  return (
    <div className="w-screen h-20 flex justify-between bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-md">
      <div className="flex">
        <h2 className="m-5 text-3xl font-black">Uniquee</h2>
      </div>
      <div className="flex text-center">
        <p className="hidden lg:m-5 font-mono text-2xl items-center flex justify-between sm:inline-flex pr-3">
          Share your creativity with everyone
        </p>
      </div>
      {user.displayName && (
        <div
          className="flex overflow-hidden"
          onClick={() => firebase.auth().signOut()}
        > 
          <a href="#" className="flex items-center hover:bg-blend-soft-light  hover:underline  ">
          {user.displayName}&nbsp;&nbsp; <LogoutIcon/>{/*  Display name on logout */}
          </a>
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white m-4"
            src={user?.photoURL}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default Header;
