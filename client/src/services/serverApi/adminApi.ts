import { getFakeServerCall } from "./helpers";
import { ServerResponse } from "./models";
import axios from "axios";

// export const loadUsersTable = () => {
//   const body: = axios.get("/aaaa", ).then(
//       res => {
//         return res.data;
//       }
//   );
//   const response: ServerResponse= {
//     success: true,
//     "data":
//       body.map(person => {
//         return {
//           ...person,
//           "lastname": person.personal.name.last,
//           "contactinformation": person.contact.telephone + " " + person.contact.socialMedia,
//           "id": person.id
//         }
//       })
//   }
//   // const response: ServerResponse = {
//   //   success: true,
//   //
//   //   data: [
//   //     {
//   //       id:'asdfasf',
//   //       nickname: "Tim123",
//   //       accounttype: "Admin",
//   //       email: "12213@mail.utoronto.ca",
//   //       firstname: "Tim",
//   //       lastname: "Kang",
//   //       name: "Tim Kang",
//   //       coins: "1200",
//   //       joindate: "Oct 31 2020",
//   //       birthday: "Jan 1 1970",
//   //       description: "This is a default description for current user.",
//   //       contactinformation:
//   //         "Tel:647-123-4567\n Facebook: Willian Joyce\n LinkedIn:willian-joyce-2be4ry\n",
//   //       interest: "This is default interests for current user.",
//   //     },
//   //     {
//   //       nickname: "Tim123",
//   //       accounttype: "Admin",
//   //       email: "12213@mail.utoronto.ca",
//   //       firstname: "Tim",
//   //       lastname: "Kang",
//   //       name: "Tim Kang",
//   //       coins: "1200",
//   //       joindate: "Oct 31 2020",
//   //       birthday: "Jan 1 1970",
//   //       description: "This is a default description for current user.",
//   //       contactinformation:
//   //         "Tel:647-123-4567\n Facebook: Willian Joyce\n LinkedIn:willian-joyce-2be4ry\n",
//   //       interest: "This is default interests for current user.",
//   //     },
//   //   ],
//   // };
//   return getFakeServerCall(response, 0.5);
// };
export const updateUsersTable = (id: any, newData: any) => {
  const url = "https://letitfly.dev/api/profiles/" + id + "/data";
  fetch(url, { body: JSON.stringify(newData), method: "patch" }).then((res) =>
    res.json()
  );
};

// export const signupUsersTale = (newData:any) => {
//   const url = 'https://letitfly.dev/api/users/signup';
//   fetch(url, {body:newData, method:'post'}).then(res => res.json())
// };
export const loadPaperCraneTable = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        from: "12213@mail.utoronto.ca",
        to: "12213@mail.utoronto.ca",
        title: "Hello world",
        date: "2020-05-15",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" +
          "tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus" +
          "non enim praesent elementum facilisis leo vel. Risus at ultrices mi" +
          "tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non" +
          "tellus. Convallis convallis tellus id interdum velit laoreet id donec" +
          "ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl" +
          "suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod" +
          "quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet" +
          "proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras" +
          "tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum" +
          "varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt." +
          "Lorem donec massa sapien faucibus et molestie ac.",
      },
      {
        from: "1223@mail.utoronto.ca",
        to: "898913@mail.utoronto.ca",
        title: "How are you?",
        date: "2020-05-15",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" +
          "tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus" +
          "non enim praesent elementum facilisis leo vel. Risus at ultrices mi" +
          "tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non" +
          "tellus. Convallis convallis tellus id interdum velit laoreet id donec" +
          "ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl" +
          "suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod" +
          "quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet" +
          "proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras" +
          "tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum" +
          "varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt." +
          "Lorem donec massa sapien faucibus et molestie ac.",
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};

export const loadActivityTable = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        performedBy: "hfljy0@mail.utoronto.ca",
        discription: "login",
        date: "2020-05-15",
      },
      {
        performedBy: "12213@mail.utoronto.ca",
        discription: "created accout",
        date: "2020-05-15",
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};

export const loadStoreTable = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        itemID: "bsdcieuwb73289ewbhdsbc",
        description: "PeachcolorPaper",
        price: "100",
      },
      {
        itemID: "ckjwbfy74928uhfrgyw8iu",
        description: "PeachcolorPaper",
        price: "500",
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};

export const loadUsersChat = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        type: "last month",
        value: 27,
      },
      {
        type: "last half month",
        value: 25,
      },
      {
        type: "last week",
        value: 18,
      },
      {
        type: "last day",
        value: 15,
      },
      {
        type: "today",
        value: 5,
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};
export const loadCranesChat = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        type: "last month",
        value: 88,
      },
      {
        type: "last half month",
        value: 56,
      },
      {
        type: "last week",
        value: 44,
      },
      {
        type: "last day",
        value: 32,
      },
      {
        type: "today",
        value: 7,
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};
