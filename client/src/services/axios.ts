/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-11
 */

import axios from "axios";

const instance = axios.create({
  baseURL: "https://letitfly.net",
  timeout: 10 * 1000,
  validateStatus: (status) => status >= 200 && status < 500,
  withCredentials: true,
});

export { instance as axios };
