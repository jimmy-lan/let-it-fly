import React, { useEffect, useRef } from "react";
import { RoseChart } from "bizcharts";
export default function Chart1({ getData }) {
  const { useState } = React;

  const [data, setData] = useState([]);
  useEffect(() => {
    if (getData) {
      (async () => {
        const { data: dataset } = await getData();
        setData(dataset);
      })();
    }
  }, [getData]);

  const ref = useRef();

  return (
    <RoseChart
      data={data}
      title={{
        visible: true,
        text: "Users",
      }}
      description={{
        visible: true,
        text: "This Chat shows user registered in different peroid",
      }}
      radius={0.8}
      radiusField="value"
      categoryField="type"
      colorField="type"
      label={{
        visible: true,
        type: "outer",
        content: (text) => text.value,
      }}
    />
  );
}
