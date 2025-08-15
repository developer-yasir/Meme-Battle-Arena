
import React, { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { admin: action.payload };
    case 'LOGOUT':
      return { admin: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { admin: null });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) {
      dispatch({ type: 'LOGIN', payload: admin });
    }
  }, []);

  const login = (adminData) => {
    localStorage.setItem('admin', JSON.stringify(adminData));
    dispatch({ type: 'LOGIN', payload: adminData });
  };

  const logout = () => {
    localStorage.removeItem('admin');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
