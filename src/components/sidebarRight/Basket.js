import { InsertComment } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useContextProvider } from "../../context/StateProvider";
import Item from "./Item";
import PaymentIcon from "@mui/icons-material/Payment";

function Basket() {
  //accessing context API  -> getting the  basket
  const [{ basket }, dispatch] = useContextProvider();
  //state for total price ///
  const [totalPrice, setTotalPrice] = useState("");

  // calculate the total amounth whenever the basket changes!
  useEffect(() => {
    const total = basket?.reduce(
      (totalAmount, item) => totalAmount + parseInt(item.price),
      0
    );
    setTotalPrice(total);
  }, [basket]);

  return (
    <div className="bg-gradient-to-r from-blue-300 via-pink-200 to-indigo-50 m-5">
      {basket?.map((item) => (
        <div className=" text-2xl h-10 mt-3 mr-2">
          <Item
            productId={item.productId}
            price={item.price}
            category={item.category}
            image={item.postImage}
          />
        </div>
      ))}
      <div className="text-2xl flex mb-2 text-red-500 border-t ">
        {totalPrice > 0 && (
          <p>
            {`$ ${totalPrice} `}{" "}
            <button className="">
              <PaymentIcon />
              Pay
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Basket;
