import React from 'react'
import logo from '../logo.png';

function Header({Web3Button}) {
  return (
    <header className="flex justify-around p-4">
      <div className="flex">
        <img className="w-[40px] h-[40px]" src={logo} alt="" />
        <h1 className=" text-2xl text-white">Header TEXT.</h1>
      </div>
      <div className="flex flex-col">
        <Web3Button></Web3Button>
        {/* {isConnected ? <div>{signer}</div> : null} */}
      </div>
    </header>
  );
}

export default Header