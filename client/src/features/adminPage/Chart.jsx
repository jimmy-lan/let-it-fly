import React from "react";
import Ch1 from "./Chart1";
import { loadCranesChat } from "../../services/serverApi/adminApi";

export const Chart = () => <Ch1 getData={loadCranesChat} />;
