import React from "react";

interface LoginInfo {
    userId : string;
    roles : "u"|"a";
}

interface LoginContextType {
    loginInfo: LoginInfo | null;
    setLoginInfo: (loginInfo: LoginInfo | null) => void
}

export const LoginContext = React.createContext<LoginContextType>({} as LoginContextType);

export const useLoginContext = () => React.useContext(LoginContext);