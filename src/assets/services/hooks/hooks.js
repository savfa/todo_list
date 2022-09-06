import { useNavigate } from "react-router-dom";
import { deleteUserAuthToken } from "../utils/localStorage";
import { AppRoute } from "../consts/routes";

/**
 * Хук возвращает колбэк, который разлогинивает пользователя
 * */
export const useOnAuthorised = () => {
  const navigate = useNavigate();

  return () => {
    deleteUserAuthToken();
    navigate(AppRoute.ROOT);
    window.location.reload();
  };
};

export const a = null;
