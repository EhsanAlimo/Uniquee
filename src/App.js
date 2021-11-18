import firebase from "firebase";
import Feedbar from "./components/feedbar/Feedbar";
import Header from "./components/Header";
import SidebarLeft from "./components/sidebarLeft/SidebarLeft";
import SidebarRight from "./components/sidebarRight/SidebarRight";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/loginPage/Login";
import React, { useEffect, useState } from "react";
import { db } from "./firebase/firebase.js";
import { useContextProvider } from "./context/StateProvider";
import { useCollection } from "react-firebase-hooks/firestore";

function App() {
  /// handle user authentication
  const [user, loading, error] = useAuthState(firebase.auth()); // Check for any users ///useAuthState is a third parrty library for firebase
  const [{ color }, dispatch] = useContextProvider();

  // hook into the user likes collection on db///
  const [realtimeUserLikes] = useCollection(
    db.collection("users").doc(user?.uid).collection("likes")
  );
  //dispatching the user likes to the reducer context (context  API)
  useEffect(() => {
    const userLikes = [];
    realtimeUserLikes?.docs.map((doc) => {
      userLikes.push(doc.id);
    });

    dispatch({
      type: "USER_LIKES",
      payload: userLikes,
    });
  }, [realtimeUserLikes]);
  //// dispatch user info to reducer whenever the user loged in
  useEffect(() => {
    if (user) {
      // user own everything
      dispatch({
        type: "user",
        payload: user,
      });
    }
  }, [user]);
  return (
    //
    <div className="w-screen bg-gray-100 flex h-screen">
      <Header />
      {user ? (
        <div className="flex w-screen">
          {" "}
          <SidebarLeft />
          <Feedbar />
          <SidebarRight />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
export default App;
