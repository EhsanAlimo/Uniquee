import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"; ////login page buttons as a third party StyledFirebaseAuth
import firebase from "firebase";
import Header from "../Header";
import image from "../image/bahman.jpeg";

// Config FirebaseUI
const uiConfig = {
  //---- Providers
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
  signInFlow: "popup",
};

function Login() {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="">
        <div className="flex items-center w-screen justify-center h-full flex-col font-mono filter drop-shadow-lg mt-32 mb-7">
          <p className="">
            This web application is aiming to encourage all individuals to be
            more creative and share their own products here with other users.
          </p>
          <p>
            At Uniquee we can help each other to grow and improve our
            imagination and creativity.
          </p>
          <p>
            You can be part of this community by creating an account and share
            your own products with everyone else here.
          </p>
          <p>
            Please be aware of our policy which is to allow users to see only
            self made products of each user.{" "}
          </p>
        </div>
        <div className="">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
        <div className="flex justify-center items-center mt-12 br ">
          <img
            src={image}
            alt=""
            className="w-52 h-52 rounded-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
