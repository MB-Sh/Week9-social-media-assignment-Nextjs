import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, ClerkLoading, ClerkLoaded} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Social Media App",
  description: "This is an app where users can interact with others",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={inter.className}
      >
        <ClerkLoading>
          <Loader/>
        </ClerkLoading> 
        <ClerkLoaded>
        <Navbar/>
        
        {children}
        </ClerkLoaded>
      </body>
    </html>
    </ClerkProvider>
  );
}
