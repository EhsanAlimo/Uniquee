import { Avatar } from "@mui/material";
import React from "react";
import { useContextProvider } from "../../context/StateProvider";
import Category from "./Category";
import BrushIcon from "@mui/icons-material/Brush";
import AttractionsIcon from "@mui/icons-material/Attractions";
import CheckroomSharpIcon from "@mui/icons-material/CheckroomSharp";
import FingerprintSharpIcon from "@mui/icons-material/FingerprintSharp";
import LensBlurSharpIcon from "@mui/icons-material/LensBlurSharp";
import LocalFloristSharpIcon from "@mui/icons-material/LocalFloristSharp";
import MilitaryTechSharpIcon from "@mui/icons-material/MilitaryTechSharp";
import SmartToySharpIcon from "@mui/icons-material/SmartToySharp";
import CakeSharpIcon from "@mui/icons-material/CakeSharp";
import ContentCutSharpIcon from "@mui/icons-material/ContentCutSharp";
function SidebarLeft() {
  //accessing constex API
  const [{ user }, dispatch] = useContextProvider();
  return (
    <div className="hidden pt-20 lg:inline-flex w-1/4 text-left bg-white flex-col px-4">
      <div className="flex justify-between items-center border-b-2 h-24 mb-3">
        <Avatar src={user.photoURL} />
        <div>{user.displayName}</div>
      </div>
      <div className="flex flex-col justify-between">
        <Category name="Painting" Icon={BrushIcon} />
        <Category name="Accessories" Icon={AttractionsIcon} />
        <Category name="Handmade" Icon={FingerprintSharpIcon} />
        <Category name="Textural" Icon={ContentCutSharpIcon} />
        <Category name="Clothes" Icon={CheckroomSharpIcon} />
        <Category name="NFTs" Icon={SmartToySharpIcon} />
        <Category name="Jewerly" Icon={MilitaryTechSharpIcon} />
        <Category name="Cookies" Icon={CakeSharpIcon} />
        <Category name="Plants" Icon={LocalFloristSharpIcon} />
        <Category name="Other" Icon={LensBlurSharpIcon} />
        {/* <CheckboxList /> */}
      </div>
    </div>
  );
}

export default SidebarLeft;
