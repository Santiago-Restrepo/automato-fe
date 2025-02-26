import { auth } from "@/auth";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await auth();
    const user = session?.user as any;
    if (user.access_token) {
      config.headers["Authorization"] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const status = err.response?.status;
    if (status === 401) {
      redirect("/login");
    }
    return err;
  }
);

export default api;
