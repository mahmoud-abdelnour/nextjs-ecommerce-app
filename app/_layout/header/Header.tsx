import Image from "next/image";
import Link from "next/link";

import HeaderTop from "./HeaderTop";
import HeaderMiddle from "./HeaderMiddle";
import HeaderBottom from "./HeaderBottom";


const Header = () => {

  return (
    <>
      <header className="header-area header-style-1 header-height-2">
      
        <HeaderTop/>
        <HeaderMiddle/>
        <HeaderBottom/>

      </header>
  
    </>
  );
};

export default Header;
