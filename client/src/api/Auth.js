import axios from "axios"
const API_URL = "http://localhost:5000/users/auth";
 export const LoginUser=async(credentials)=>{
    const response=await axios.post(`${API_URL}/login`,credentials, { withCredentials: true })
    return response.data
}
export const registerUser=async(userData)=>{
    const response=await axios.post(`${API_URL}/register`,userData, { withCredentials: true })
    return response.data
}
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  return response.data;
};
