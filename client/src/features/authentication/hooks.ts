/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-30
 */

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { clearError, UserErrorObject } from "../../app/redux/userAuthSlice";

/**
 * Use error object from user slice.
 * @return array like [validationError, serverError]
 */
export const useError = (): [
  UserErrorObject["validation"],
  UserErrorObject["server"]
] => {
  const dispatch = useDispatch();

  const error = useSelector((state: RootState) => state.userAuth.error);
  const validationError = error?.validation;
  const serverError = error?.server;

  // Clear all validation errors on first visit
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return [validationError, serverError];
};
