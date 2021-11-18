import React from 'react'
import { useContextProvider } from "../../context/StateProvider";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


function Item({price, category, image, productId}) {
    const [{ basket }, dispatch] = useContextProvider();
    const removeHandler =() => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            payload: productId, 
        })
    }
    return (
        <div className="lg:w-full flex justify-between items-center border-t " >
            <button className=" text-red-400 mb-2" onClick={removeHandler}>
                <HighlightOffIcon/>
                </button>
            <div className="sm:inline-flex text-l">
                {price} <AttachMoneyIcon/>
            </div>
            <div className=" hidden sm:inline-flex ">  {/* Small screen hide category */}
                {category}
            </div>
            <div>
                <img src={image} alt="" className=" lg:max-w-xs lg:w-sm h-10 w-10 border "/>
            </div>
        </div>
    )
}

export default Item
