import React from "react";

function NavBar({ handleClick }) {
  return (
    <>
      <button onClick={handleClick}>Toggle Userview</button>
    </>
  );
}

export default NavBar;
