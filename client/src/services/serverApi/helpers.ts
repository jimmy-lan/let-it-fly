/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-25
 * Description: Common server call helpers and structures
 */

/**
 * Utility function to fake a response from server.
 * @param response the response to be returned from the fake server.
 * @param seconds the number of seconds to resolve promise.
 */
export const getFakeServerCall = <T>(response: T, seconds: number) => {
  return new Promise<typeof response>((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, seconds * 1000);
  });
};
