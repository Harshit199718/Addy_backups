import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";

const getTokenAndDecode = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('access') || null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken
  } catch (error) {
    dispatch(logOut())
  }
}

export const CheckUserIDAuth = () => {
  const dispatch = useDispatch();

  try {
    const decodedToken = getTokenAndDecode();
    if (!decodedToken || !decodedToken.user_id) {
      throw new Error('No user ID found');
    }

    const { user_id } = decodedToken;
    return { userid: user_id };
  } catch (error) {
    console.error('Error in checking user ID authentication:', error);
    dispatch(logOut());
  }
};

export const CheckUserAuth = () => {
  const dispatch = useDispatch();

  try {
    const decodedToken = getTokenAndDecode();
    if (!decodedToken || !decodedToken.user) {
      throw new Error('No user data found');
    }

    const { username, user_group } = decodedToken.user || {};
    return { username, user_group };
  } catch (error) {
    console.error('Error in checking user authentication:', error);
    dispatch(logOut());
  }
};