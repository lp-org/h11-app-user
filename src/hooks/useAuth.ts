import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppState } from "store";
import { useAuthStore } from "store/useAuthStore";
import { AuthLogin } from "types/auth";
import { request } from "utils/request";
import { usePopUpMessage } from "./notification";

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);
  const popUpMsg = usePopUpMessage();
  return useMutation(async (payload: AuthLogin) => {
    try {
      const res = await request.post("/auth/signin", payload);

      setToken(res.data.token);
      request.defaults.headers.common = {
        Authorization: `Bearer ${res.data.token}`,
      };
      popUpMsg("Login Successful!", "success");
    } catch (error) {
      popUpMsg(
        "Email or Password is incorrect. Kindly enter the correct email or passsword.",
        "error"
      );
      throw new Error("Incorrect Credentials");
    }
  });
}

export function useSession() {
  const previousAuth = useAuthStore((state) => state.previousAuth);
  const removeToken = useAuthStore((state) => state.removeToken);
  const [isAuthed, setIsAuthed] = useState(previousAuth);
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  const setLoading = useAppState((state) => state.setLoading);
  useEffect(() => {
    (async () => {
      setToken(token);
      request.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      try {
        setLoading(true);
        const isAuthed = await mockMeApi(token);
        setIsAuthed(isAuthed);
      } catch (error) {
        setIsAuthed(false);
        removeToken();
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return { isAuthed };
}

// export function useLogout() {

// }

async function mockMeApi(token: string): Promise<boolean> {
  try {
    if (token) {
      const { data } = await request.get("/test/user");
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Incorrect Credentials");
  }
}
