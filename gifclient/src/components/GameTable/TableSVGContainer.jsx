import React, { useRef, useState, useEffect } from "react";

import { JudgedCard } from "../JudgedCard";

const TableSVGContainer = () => {
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

export default TableSVGContainer;
