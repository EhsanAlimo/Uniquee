import { Avatar, CardActions } from "@mui/material";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import firebase from "firebase";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { makeStyles } from "@mui/styles";
import { useContextProvider } from "../../context/StateProvider";
import { Collections } from "@material-ui/icons";
import { db } from "../../firebase/firebase";
// import CardActions from "@mui/material/CardActions";

/// customizing material ui component
const useStyles = makeStyles((theme) => ({
  desc: {
    paddingBottom: 0,
  },
  btnHolder: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  likeBtn: {
    marginLeft: "3px",
  },
}));

function Feed({
  category,
  description,
  postImage,
  price,
  productOwner,
  ownerPhoto,
  postTime,
  productId,
}) {
  const classes = useStyles();
  // the state for the likes status
  const [liked, setLiked] = useState(false);
  // const [expanded, setExpanded] = React.useState(false);
  //accessing the context API /////
  const [{ basket, user, userLikes }, dispatch] = useContextProvider();
  // the state of total numbers of likes
  const [likesCount, setLikesCount] = useState(0);

  //Real time product hook for likes
  const [thisProduct, loading, error] = useDocument(
    firebase.firestore().doc(`products/${productId}`)
  );

  // add to basket handler

  const addToBasket = () => {
    dispatch({
      type: "addToBasket",
      payload: {
        category: category,
        price: price,
        postImage: postImage,
        productId: productId,
      },
    });
  };

  //Function for handling likes status
  useEffect(() => {
    if (userLikes?.includes(productId)) {
      setLiked(true);
    }
  }, [userLikes]);

  //faster counting likes without delay
  useEffect(() => {
    setLikesCount(thisProduct?.data().likes);
  }, [thisProduct]);

  const likeHandler = () => {
    if (!liked) {
      db.collection("users")
        .doc(user?.uid)
        .collection("likes")
        .doc(productId)
        .set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(setLikesCount((prevCount) => prevCount + 1)) //to make the like count faster and not waiting for data base to return the increment or decrement
        .then(setLiked(true));
    } else {
      db.collection("users")
        .doc(user?.uid)
        .collection("likes")
        .doc(productId)
        .delete()
        .then(setLikesCount((prevCount) => prevCount - 1)) //to make the like count faster and not waiting for data base to return the increment or decrement
        .then(setLiked(false));
    }
  };

  return (
    <Card sx={({ maxWidth: 900 }, { marginBottom: 5 })}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Avatar alt="Cindy Baker" src={ownerPhoto} />
          </Avatar>
        }
        title={productOwner}
        subheader={new Date(postTime?.toDate()).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        className="h-56 md:h-96"
        image={postImage}
        alt={postImage}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          className={classes.desc}
        >
          <p className="">{description}</p>
        </Typography>
      </CardContent>
      <div className="flex justify-between w-full py-2 border-t mt-3 border-b1 ">
        <div className=" flex items-center space-x-2 lg:w-1/3 ">
          <span>&nbsp;&nbsp;</span>
          <CategoryIcon />
          <p className="sm:inline-flex text-xs ">{category}</p>
        </div>
        <div className=" flex justify-center items-center w-1/3">
          <AttachMoneyIcon />
          <p className="sm:inline-flex text-xs">{price}</p>
        </div>
        <div
          className=" lg:w-1/3 flex cursor-pointer justify-end items-center group space-x-2 "
          onClick={addToBasket}
        >
          <p className="sm:inline-flex text-transparent group-hover:text-black text-xs ">
            Add to basket
          </p>
          <ShoppingBasketIcon />
          <span>&nbsp;&nbsp;</span>
        </div>
      </div>
      <div className="border-t flex justify-between lg:w-full ">
        <CardActions className={classes.btnHolder}>
          <Button variant="text" name="Like" onClick={likeHandler}>
            <span>&nbsp;</span>
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span>&nbsp;Like&nbsp;&nbsp;{likesCount}</span>
          </Button>
          <Button variant="text" name="Share">
            <span>Comment&nbsp;</span>
            <CommentIcon />
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Feed;
