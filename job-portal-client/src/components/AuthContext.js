// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const login = (userData) => {
//     setUser(userData);
//     setIsAdmin(userData.isAdmin); // Set isAdmin based on user data
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAdmin(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export {AuthProvider};