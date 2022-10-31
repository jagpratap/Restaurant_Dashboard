import {
  createContext,
  useState,
  useContext,
  useMemo,
} from "react";

export const UserContext = createContext({
  isAuthenticated: false,
  chartList: [],
  bookmarks: [],
});

const UserProvider = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [chartList, setChartList] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const value = useMemo(() => ({
    isAuthenticated, setAuthentication, chartList, setChartList, bookmarks, setBookmarks,
  }), [isAuthenticated, chartList, bookmarks]);
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export const useUserContext = () => useContext(UserContext);
