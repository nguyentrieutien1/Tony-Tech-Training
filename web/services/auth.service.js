import { API_URL } from "./../constants/apiUrl.js";
class AuthService {
  static signIn = async ({ email, password }) => {
    const result = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return result;
  };
  static signUp = async ({ email, password }) => {
    const result = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return result;
  };
}
export { AuthService };
