import React from "react";

export const Box = (): JSX.Element => {
  return (
    <div className="relative w-[540px] h-[708px]">
      <div className="fixed top-0 left-0 w-0.5 h-px">
        <img
          className="absolute top-[-354px] left-[-270px] w-[540px] h-[601px] object-cover"
          alt="Image"
          src="/figmaAssets/image-3.png"
        />
      </div>
    </div>
  );
};
