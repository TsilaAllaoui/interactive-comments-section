import { createContext } from "react";
import { IUser } from "../interfaces/Comment";

export const UserContext = createContext<IUser>({
  username: "",
  image: "",
});
