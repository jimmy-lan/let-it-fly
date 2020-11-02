/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Server APIs for user-related queries
 */
import { getFakeServerCall } from './helpers';
import { ServerResponse, UserRole } from './models';

export const loadUsersTable = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        nickname: 'Tim123',
        accounttype: 'Admin',
        email: '12213@mail.utoronto.ca',
        name: 'Tim Kang',
        coins: 1200,
        joindate: 'Oct 31 2020',
        dateofbirth: 'Jan 1 1970',
        contactinformation: ['contactinformation','Tel:647-123-4567\n Facebook: Willian Joyce\n LinkedIn:willian-joyce-2be4ry\n'],
      },
      {
        nickname: 'TomHandsome',
        accounttype: 'Regular',
        email: '12315@mail.utoronto.ca',
        name: 'Tom Clarsion',
        coins: 900,
        joindate: 'Oct 31 2020',
        dateofbirth: 'Jan 1 1970',
        contactinformation: '12312313',

      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};

export const loadPaperCraneTable = () => {
  const response: ServerResponse = {
    success: true,
    data: [
      {
        from: '12213@mail.utoronto.ca',
        to: '12213@mail.utoronto.ca',
        title: 'Hello world',
        date: '2020-05-15',
      },
      {
        from: '1223@mail.utoronto.ca',
        to: '898913@mail.utoronto.ca',
        title: 'Hello world',
        date: '2020-05-15',
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
        performedBy: '12213@mail.utoronto.ca',
        discription: 'login',
        date: '2020-05-15',
      },
      {
        performedBy: '12213@mail.utoronto.ca',
        discription: 'created accout',
        date: '2020-05-15',
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
        itemID: 'bsdcieuwb73289ewbhdsbc',
        description: 'PeachcolorPaper',
        price: 100,
      },
      {
        itemID: 'ckjwbfy74928uhfrgyw8iu',
        description: 'PeachcolorPaper',
        price: 500,
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};
