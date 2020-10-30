/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Server APIs for user-authentication related queries
 */
import { getFakeServerCall } from './helpers';
import { ServerResponse, UserRole } from './models';

/**
 * A response returned from sign in or sign up actions
 */
export interface AuthResponse extends ServerResponse {
  data?: {
    token: string;
    email: string;
    role: UserRole;
    avatarLink: string;
    coins: number;
  };
}

/**
 * A fake token generated with "sub" equal to "user@user.com"
 */
const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQHVzZXIuY29tIiwibmFtZSI6IldpbGxpYW0gSm95Y2UiLCJpYXQiOjE1MTYyMzkwMjJ9.gSBKHwOWcwi3Lgz_ONbckfnf83Jv1tGi9XFvjqbuaBA';

/**
 * Send sign in request to server
 * @param email user email
 * @param password user password
 */
export const signIn = (email: string, password: string) => {
  const loginInfo = [
    { email: 'admin@admin.com', password: 'admin', role: UserRole.admin },
    { email: 'user@user.com', password: 'user', role: UserRole.user },
  ];

  const currentUser = loginInfo.filter(
    (entry) => entry.email === email && entry.password === password
  );

  let response: AuthResponse;

  if (currentUser.length === 0) {
    response = {
      success: false,
      errorMessage: 'Incorrect email or password!',
    };
  } else {
    response = {
      success: true,
      data: {
        token: fakeToken,
        email,
        role: email === 'admin@admin.com' ? UserRole.admin : UserRole.user,
        avatarLink: 'https://via.placeholder.com/150/0000FF/808080?Text=User',
        coins: 1000,
      },
    };
  }

  // const response: AuthResponse = {
  //   success: false,
  //   errorMessage: "You were banned from the server.",
  // };
  return getFakeServerCall(response, 1.5);
};

/**
 * Send sign up request to server
 * @param email user email
 * @param password user password
 */
export const signUp = (email: string, password: string) => {
  const response: AuthResponse = {
    success: true,
    data: {
      token: fakeToken,
      email,
      role: email === 'admin@admin.com' ? UserRole.admin : UserRole.user,
      avatarLink: 'https://via.placeholder.com/150/0000FF/808080?Text=User',
      coins: 1000,
    },
  };
  return getFakeServerCall(response, 1.5);
};

/**
 * Send request password request to server
 * @param email user email
 */
export const requestPassword = (email: string) => {
  const response: ServerResponse = {
    success: true,
  };
  return getFakeServerCall(response, 0.5);
};

/**
 * Send sign out request to server. Using cookie-based authentication,
 * this function should not require any parameters.
 */
export const signOut = () => {
  const response: ServerResponse = {
    success: true,
  };
  return getFakeServerCall(response, 0.5);
};

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
      },
      {
        nickname: 'TomHandsome',
        accounttype: 'Regular',
        email: '12315@mail.utoronto.ca',
        name: 'Tom Clarsion',
        coins: 900,
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
        itemId: 'bsdcieuwb73289ewbhdsbc',
        discription: 'PeachcolorPaper',
        price: 100,
      },
      {
        itemId: 'ckjwbfy74928uhfrgyw8iu',
        discription: 'PeachcolorPaper',
        price: 500,
      },
    ],
  };
  return getFakeServerCall(response, 0.5);
};
