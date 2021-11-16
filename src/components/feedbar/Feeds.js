import React, { useEffect } from "react";
import Feed from "./Feed";
import Avatar from "@mui/material/Avatar";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import { useContextProvider } from "../../context/StateProvider";

function Feeds() {
  const [{ products, filteredProducts, selectedCategory }, dispatch] =
    useContextProvider();
  const [realtimeProducts] = useCollection(
    db.collection("products").orderBy("timestamp", "desc").limit(10) // desc going down last one on top db is connected
    );


  useEffect(() => {
    const myProducts = [];
    realtimeProducts?.docs.map((product) => {
      myProducts.push({
        id: product.id,
        postTime: product.data().timestamp,
        ownerPhoto: product.data().userPhoto,
        category: product.data().category,
        description: product.data().description,
        price: product.data().price,
        postImage: product.data().postImage,
        productOwner: product.data().user,
      });
    });
    dispatch({
      type: "ADD_PRODUCTS",
      payload: myProducts,
    });
  }, [realtimeProducts]);

  return (
    <div className=" w-full lg:w-3/4  m-auto rounded-xl">
      {selectedCategory
        ? filteredProducts.map(
            (
              product //show all feeds from db
            ) => (
              <Feed
                key={product.id}
                productId={product.id}
                postTime={product.postTime}
                ownerPhoto={product.ownerPhoto}
                category={product.category}
                description={product.description}
                price={product.price}
                postImage={product.postImage}
                productOwner={product.productOwner}
              />
            )
          )
        : products?.map(
            (
              product //show all feeds from db
            ) => (
              <Feed
                key={product.id}
                productId={product.id}
                postTime={product.postTime}
                ownerPhoto={product.ownerPhoto}
                category={product.category}
                description={product.description}
                price={product.price}
                postImage={product.postImage}
                productOwner={product.productOwner}
              />
            )
          )}
    </div>
  );
}

export default Feeds;
