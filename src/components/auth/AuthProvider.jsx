import React, { createContext, useState, useContext } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import PropTypes from 'prop-types';

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
});

const AuthProfile = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token) => {
        const decodedToken = jwt_decode(token);
        localStorage.setItem("userId", decodedToken.sub);
        localStorage.setItem("userRole", decodedToken.roles);
        localStorage.setItem("token", token);
        setUser(decodedToken);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProfile.propTypes = {
    children: PropTypes.node.isRequired
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProfile;
