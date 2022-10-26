import {
  createContext,
  useState,
  useContext,
  useMemo,
} from "react";

export const UserContext = createContext({
  isAuthenticated: false,
});

const UserProvider = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(false);
  const value = useMemo(() => ({
    isAuthenticated, setAuthentication,
  }), [isAuthenticated]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export const useUserContext = () => useContext(UserContext);
