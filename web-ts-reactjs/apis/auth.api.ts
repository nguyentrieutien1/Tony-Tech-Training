import { apiClient } from "@/config/axios.config";
import { UserDTO } from "@/types/user.type";

class AuthApi {
  static signIn = async (user: UserDTO) => {
    const res = await apiClient.post("/user/signin", user);
    const data = res.data;
    return data;
  };
  static signUp = async (user: UserDTO) => {
    const res = await apiClient.post("/user/signup", user);
    const data = res.data;
    console.log(data);
    return data;
  };
}
export { AuthApi };
