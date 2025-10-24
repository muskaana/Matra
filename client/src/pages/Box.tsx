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

        <p className="absolute top-0 left-0 w-px [font-family:'Tiro_Devanagari_Hindi',Helvetica] font-normal text-black text-[26px] tracking-[0] leading-[normal] whitespace-nowrap">
          if you want to try out animation, we can introduce a character like
          this. otherwise, lets skip. regardless we&apos;ll get to this later
        </p>
      </div>
    </div>
  );
};
