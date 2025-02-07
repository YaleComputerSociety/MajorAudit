
"use client";
import { createContext, useContext, useState } from "react";

import { User } from "@/types/type-user";
import { NullUser } from "@/database/data-user";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState({ loggedIn: false });
  const [user, setUser] = useState<User>(NullUser);

  return(
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
