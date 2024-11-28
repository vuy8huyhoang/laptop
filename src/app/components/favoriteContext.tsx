"use client";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";



interface FavoriteContextType {
    favoriteItems: FavoriteItem[];
    addToFavorite: (product: FavoriteItem) => void;
    removeFromFavorite: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorite must be used within a FavoriteProvider");
    }
    return context;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavoriteItems(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favoriteItems));
    }, [favoriteItems]);

    const addToFavorite = (product: FavoriteItem) => {
        setFavoriteItems((prevItems) => {
            if (prevItems.find((item) => item.id === product.id)) {
                return prevItems; 
            }
            return [...prevItems, product];
        });
    };

    const removeFromFavorite = (productId: number) => {
        setFavoriteItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const isFavorite = (productId: number) => {
        return favoriteItems.some((item) => item.id === productId);
    };

    return (
        <FavoriteContext.Provider value={{ favoriteItems, addToFavorite, removeFromFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
