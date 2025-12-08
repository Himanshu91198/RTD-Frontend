import axios from "axios";
import { API_URL } from "../config/constants";
import { jwtDecode } from "jwt-decode";
import type { ILoginResponse } from "../models/response/ILoginResponse";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export function GetUserName() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: ILoginResponse = jwtDecode(token);
    return (
      decoded.username.charAt(0).toUpperCase() +
      decoded.username.slice(1).toLowerCase()
    );
  }
}

export function GetUserId() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: ILoginResponse = jwtDecode(token);
    return decoded.id;
  }
}

export async function LoginService(request: ILoginRequest) {
  try {
    const res = await axios.post(`${API_URL}/users/login`, request);
    return res;
  } catch (err) {
    console.log(`Login request failed`, err);
  }
}

export async function RegisterService(request: IRegisterRequest) {
  try {
    const res = await axios.post(`${API_URL}/users/register`, request);
    return res;
  } catch (err) {
    console.log("Register request failed", err);
  }
}
