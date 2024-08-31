import ApiClient from "../helpers/ApiClient";
import axios from "axios";
import { API } from "../config/config";
import { clearUserDetailsInLocalStorage } from "../helpers/UserDetails";
export async function signIn(username, password) {
  // axios.defaults.withCredentials = true;
  try {
    const response = await axios.post(`${API}/auth/signin`, {
      username,
      password,
    });
    // document.cookie = `accessToken=${response?.data?.accessToken}`;
    // document.cookie = `refreshToken=${response?.data?.accessToken}`;
    document.cookie = `restro__authenticated=${true}`;
    localStorage.setItem("accessToken", response?.data?.accessToken);
    
    return response;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  axios.defaults.withCredentials = true;
  try {
    const response = await ApiClient.post(`${API}/auth/signout`);
    clearUserDetailsInLocalStorage();

    return response;
  } catch (error) {
    throw error;
  }
}
