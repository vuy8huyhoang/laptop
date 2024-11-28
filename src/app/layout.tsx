import type { Metadata } from "next";
import ReduxProviders from '../redux/Provider';
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { SearchProvider } from "./components/searchContext";
import { FavoriteProvider } from "./components/favoriteContext";//sadasdasdas
import { AuthProvider } from "./components/authContext";//lllllllllládasdasdasdsdasdasdasd

export const metadata: Metadata = {
  title: "Cửa hàng laptop",
  description: "Chuyên cung cấp sản phẩm điện tử như:máy tính,laptop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="https://tailwindui.com/plus/img/logos/mark.svg?color=white&shade=600" type="image/x-icon" />
      <body
        className={` antialiased`}
      >
        <AuthProvider>
          <ReduxProviders>

            <FavoriteProvider>
              <SearchProvider>
                <Header />
                <div className="mt-24">
                  {children}
                </div>
                <Footer />
              </SearchProvider>
            </FavoriteProvider>
          </ReduxProviders>

        </AuthProvider>
      </body>
    </html>
  );
}
