'use client';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    authenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const token = getCookie('accessToken');
        const refresh = getCookie('refreshToken');

        if (refresh) {
            setRefreshToken(refresh);

            if (token) {
                setAuthenticated(true);
                setAccessToken(token);
            } else {
                fetchNewAccessToken(refresh);
            }

            const interval = setInterval(() => {
                if (authenticated && refresh) {
                    fetchNewAccessToken(refresh);
                }
            }, 4000);

            return () => clearInterval(interval);
        } else {
            setAuthenticated(false);
            setAccessToken(null);
        }
    }, [authenticated]);


    const fetchNewAccessToken = async (refresh: string) => {
        if (!authenticated) return; 

        try {
            const response = await fetch('http://localhost:3001/users/refresh-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: refresh }),
            });
            const data = await response.json();

            if (response.ok && data.accessToken) {
                login(data.accessToken, refresh);
            } else {
                console.log('Failed to refresh access token:', data.message || 'Unknown error');
                logout();
            }
        } catch (error) {
            console.error('Error refreshing access token:', error);
            logout();
        }
    };


    const login = (token: string, refresh: string) => {
        document.cookie = `accessToken=${token}; path=/; Max-Age=5`; 
        document.cookie = `refreshToken=${refresh}; path=/; Max-Age=2592000`; 
        setAuthenticated(true);
        setAccessToken(token);
        setRefreshToken(refresh);
    };

    const logout = () => {
        document.cookie = `accessToken=; path=/; Max-Age=0`;
        document.cookie = `refreshToken=; path=/; Max-Age=0`;
        setAuthenticated(false);
        setAccessToken(null);
        setRefreshToken(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}
