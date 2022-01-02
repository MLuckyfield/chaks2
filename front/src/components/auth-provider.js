import React, { createContext, useState, useEffect, useMemo, useContext } from "react";


export const AuthDataContext = React.createContext();

const initialAuthData = null;

const AuthDataProvider = props => {
  const [user, setUser] = useState(initialAuthData);

  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */

  const onLogout = () => setUser(initialAuthData);

  const onLogin = (newAuthData) => {
    setUser(newAuthData);
    localStorage.setItem('user', JSON.stringify(newAuthData));
  };

  useEffect(
        () => {
            //console.log(user);
        },
        [user]
    );
  //const authDataValue = useMemo({ ...user, onLogin, onLogout }, [user]);


  return <AuthDataContext.Provider value={{user, onLogin, onLogout }} {...props} />;
};

export const useAuthDataContext = () => React.useContext(AuthDataContext);

export default AuthDataProvider;
