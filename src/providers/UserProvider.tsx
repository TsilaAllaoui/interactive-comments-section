import { useState } from "react";
import { UserContext } from "../contexts/user";
import { IUser } from "../interfaces/Comment";

function UserProvider({ children }: { children: any }) {
  const [user, _setUser] = useState<IUser>({
    image: "./images/avatars/image-juliusomo.png",
    username: "juliusomo",
  });
  return (
    <UserContext.Provider
      value={{
        username: user.username,
        image: user.image,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
