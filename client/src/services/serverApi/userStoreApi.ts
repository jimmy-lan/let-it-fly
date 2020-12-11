import { getFakeServerCall } from "./helpers";
import { ServerResponse } from "./models";
import axios from "axios";
export const loadStoreContents = () => {
  let response: ServerResponse;
  const url = "https://letitfly.dev/api/users/property/inventory";
  axios
    .get(url)
    .then((result) => {
      if ("data" in result.data) {
        response = {
          success: result.data.success,
          data: result.data.data,
        };
      } else if ("error" in result.data) {
        console.log(result.data.error);
      }

      return getFakeServerCall(response, 0.5);
    })
    .catch((e) => {
      console.log(e);
    });
};
