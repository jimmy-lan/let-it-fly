import React from "react";
import Ch1 from "./Chart1";
//import Ch2 from "./Chart2";
import {loadCranesChat} from "../../services/serverApi/adminApi";
import { RoseChart } from 'bizcharts';

export const Chart = () => (
  <Ch1
      getData = {loadCranesChat}
  />

);
