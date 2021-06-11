import React, { useRef, useState, useEffect } from "react";

import { JudgedCard } from "../../../../components/JudgedCard";

export const SVGContainer = () => {
  const tableSvg = useRef(null);
  const [dims, setDims] = useState(null);
  useEffect(() => {
    setDims({
      height: tableSvg.current.height.baseVal.value || null,
      width: tableSvg.current.width.baseVal.value || null,
    });
  }, []);
  // const renderCard = dims !== null ? <JudgedCard dims={dims} /> : "";
  return <>{}</>;
};
