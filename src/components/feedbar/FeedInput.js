import React, { useRef, useState } from "react";
import { useContextProvider } from "../../context/StateProvider";
import { db, storage } from "../../firebase/firebase"; //import db
import firebase from "firebase"; //b import firebase from firease
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

//customizing material UI componenets
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "12px  16px 10px 16px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
  },
}));

function FeedInput() {
  const classes = useStyles(); //customizing material UI componenets
  const [{ user }, dispatch] = useContextProvider(); // access the context API
  const descriptionRef = useRef(null); // defining refs for input
  const priceRef = useRef(null); // defining refs for input
  const [category, setCategory] = useState("defaultCategory"); //state for category
  const [loading, setLoading] = useState(false); //state for preventing user to post same product couple of times
  const fileRef = useRef(null); // defining refs for input
  const [postImage, setPostImage] = useState(); //state for storing the image before uploading to db
  //to remove the picture from the feedinput if the user uploaded a wrong image
  const removeImage = () => {
    setPostImage(null);
  };

  //Handle image uploading !!
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); ///remember this code for uploadng the file
    }

    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result);
    };
  };

  //Hangle posting to db
  const submitHandler = (event) => {
    event.preventDefault();
    if (loading === true) return; //if someone click more times at once //if function is running do not run it again
    setLoading(true);
    //checking for valid input
    if (
      category === "defaultCategory" ||
      descriptionRef.current.value === "" ||
      priceRef.current.value === ""
    )
      return;

    db.collection("products")
      .add({
        //create Table products
        user: user?.displayName, //USER OWNS IT!!
        likes: 0,
        userid: user.uid,
        userPhoto: user.photoURL,
        description: descriptionRef.current.value, //field
        price: priceRef.current.value,
        category: category,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        //we uploading the image seperately ////
        //IMAGE!!
        if (postImage) {
          const uploadTask = storage
            .ref(`products/${doc.id}`)
            .putString(postImage, "data_url");

          removeImage(); //removing image after uploading
          //uploading the image
          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            () => {
              storage
                .ref("products")
                .child(doc.id)
                .getDownloadURL() //gettig the uploaded image url
                .then((url) => {
                  db.collection("products").doc(doc.id).set(
                    //adding the url to the product's doc
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    //reseting the inputs and the states
    descriptionRef.current.value = "";
    priceRef.current.value = "";
    setCategory("defaultCategory");
    setLoading(false); //disable
  };

  return (
    <div className="mx-auto w-full  lg:w-3/4   mb-5  rounded-lg">
      <Card className={classes.root}>
        <div className="flex space-x-4 items-center">
          <Avatar src={user?.photoURL} className="h-8 w-8" />
          <form className="w-full flex " onSubmit={submitHandler}>
            <input
              ref={descriptionRef}
              type="text"
              placeholder="Tell us about your product"
              className=" rounded-full h-10 placeholder-gray-500 placeholder-opacity-100 bg-gray-100 flex-grow px-5 focus:outline-none w-full"
            />
            <button className="hidden" onClick={submitHandler}>
              Submit
            </button>
          </form>
          {postImage && (
            <div
              onClick={removeImage}
              className="flex flex-col filter hover:brightness-90 transition duration-150 transform hover:scale-95 cursor-pointer"
            >
              <img
                loading="lazy"
                src={postImage}
                alt="postImage"
                className="h-9 object-contain "
              />
            </div>
          )}
        </div>

        <div className="flex justify-between lg:w-full pt-3 border-t mt-4 space-x-4">
          {/* Photo button */}
          <div
            className="inputBtn rounded-bl-lg flex justify-center  w-1/5 "
            onClick={() => fileRef.current.click()}
          >
            <p className="flex space-x-2">
              <PhotoCameraIcon />{" "}
              <p className=" hidden sm:inline-flex text-xs font-semibold text-gray-600 sm:text-sm xl:text-base">
                Photo
              </p>
            </p>
            <input type="file" hidden ref={fileRef} onChange={addImageToPost} />
          </div>
          {/* Category dropDown */}
          <div className=" flex items-center  justify-center w-1/5  h-10">
            <FormControl variant="standard" fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value="defaultCategory" selected>
                  <p className="text-gray-400">Category</p>
                </MenuItem>
                <MenuItem value="Painting">Painting</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Handmade">Handmade</MenuItem>
                <MenuItem value="Txtural">Textural</MenuItem>
                <MenuItem value="Clothes">Clothes</MenuItem>
                <MenuItem value="NFTs">NFTs</MenuItem>
                <MenuItem value="Jewerly">Jewerly</MenuItem>
                <MenuItem value="Cookies">Cookies</MenuItem>
                <MenuItem value="Plants">Plants</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Price input */}
          <div className="mb-1 flex items-center border-b border-gray-400  justify-center cursor-pointer  rounded-sm w-1/5  ">
            <input
              className="w-full outline-none mx-2 "
              type="text"
              name="price"
              placeholder="Price $"
              ref={priceRef}
            />
          </div>

          {/* Send button */}
          <div className="inputBtn rounded-br-lg w-1/5" onClick={submitHandler}>
            <p className="space-x-2 flex ">
              <p className="hidden sm:inline-flex text-xs font-semibold text-gray-600 sm:text-sm xl:text-base">
                Send
              </p>
              <SendIcon />
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FeedInput;
