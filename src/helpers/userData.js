import Cookies from "js-cookie";

export const USER_DATA_UPDATED_EVENT = "userDataUpdated";

export const getUserData = () => {
  const raw = Cookies.get("userData");
  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
};

export const saveUserData = (userData) => {
  Cookies.set("userData", JSON.stringify(userData));

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(USER_DATA_UPDATED_EVENT, { detail: userData }),
    );
  }
};
