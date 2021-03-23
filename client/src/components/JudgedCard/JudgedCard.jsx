import React, { useRef, useState, useEffect } from "react";
//l -${height * .1} ${cy}
const JudgedCard = ({ dims }) => {
  console.log(dims);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  useEffect(() => {
    setHeight(dims.height);
    setWidth(dims.width);
  }, [dims, height, width]);

  const cy = height / 2;
  const cx = width / 2;
  console.log(cx, cy);
  const tl = { x: cx - width * 0.075, y: cy - height * 0.2 };
  const bl = { x: cx - width * 0.075, y: cy + height * 0.2 };
  const br = { x: cx + width * 0.075, y: cy + height * 0.2 };
  const tr = { x: cx + width * 0.075, y: cy - height * 0.2 };
  return (
    <>
      <path
        d={`m ${cx} ${cy} L ${tl.x} ${tl.y} L ${bl.x} ${bl.y} L ${br.x} ${br.y} L ${tr.x} ${tr.y} L ${tl.x} ${tl.y}  z`}
        style={{ fill: "red", stroke: "1px solid black" }}
      />
      {/*<rect*/}
      {/*  x={10}*/}
      {/*  y={10}*/}
      {/*  width="10vw"*/}
      {/*  height="25vh"*/}
      {/*  rx="15"*/}
      {/*  style={{ stroke: "black", strokeWidth: "1px", fill: "blue" }}*/}
      {/*/>*/}
    </>
  );
};

export default JudgedCard;
