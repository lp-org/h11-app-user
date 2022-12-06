import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppState } from "store";
import { useAuthStore } from "store/useAuthStore";
import { AuthLogin } from "types/auth";
import { usePopUpMessage } from "./notification";

export function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);
  const popUpMsg = usePopUpMessage();
  return useMutation(async (payload: AuthLogin) => {
    if (payload.email === "user" && payload.password === "user123") {
      setToken("thisisamocktoken");

      return true;
    } else {
      popUpMsg("Incorrect Credentials", "error");
      throw new Error("Incorrect Credentials");
    }
  });
}

export function useSession() {
  const previousAuth = useAuthStore((state) => state.previousAuth);
  const removeToken = useAuthStore((state) => state.removeToken);
  const [isAuthed, setIsAuthed] = useState(previousAuth);
  const token = useAuthStore((state) => state.token);
  const setLoading = useAppState((state) => state.setLoading);
  useEffect(() => {
    (async () => {
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
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (token === "thisisamocktoken") resolve(true);
      else reject("Incorrect Credentials");
    }, 1000);
  });
}
