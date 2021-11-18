import React from "react";
import { useContextProvider } from "../../context/StateProvider";

const Category = ({ name, Icon }) => {
  //accessing constex API
  const [{ selectedCategory }, dispatch] = useContextProvider();
  //dispatching the category name for filtering
  const clickHandler = () => {
    dispatch({
      type: "SELECT_CATEGORY",
      payload: selectedCategory === name ? "" : name,
    });
  };

  return (
    <div
      className={`flex justify-between items-center cursor-pointer mb-2 ${
        selectedCategory === name && "bg-gray-200 p-2 "
      }`}
      onClick={clickHandler}
    >
      <div className="border rounded-full">
        <Icon />
      </div>
      <div>{name}</div>
    </div>
  );
};

export default Category;
