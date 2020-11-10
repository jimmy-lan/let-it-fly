import { getFakeServerCall } from "./helpers";
import { ServerResponse } from "./models";

export const loadStoreContents = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        itemName: "Blue Colored Cranes",
        itemDesc: "Chill with a blue colored crane admist a busy day!",
        price: "500 Coins",
        color: "blue",
      },
      {
        itemName: "Red Colored Cranes",
        itemDesc: "Ignite your passion with a bright red paper crane!",
        price: "500 Coins",
        color: "red",
      },
      {
        itemName: " Green Colored Cranes",
        itemDesc: "Feel refreshed using a lime green paper crane!",
        price: "500 Coins",
        color: "green",
      },
      {
        itemName: "Yellow Colored Cranes",
        itemDesc: "Spread your joy with a luminous yellow paper crane!",
        price: "500 Coins",
        color: "yellow",
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};
