import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Signin } from "./Signin";

export function Layout({ children }) {
    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
            }}
        >
            <Navbar />
            <div className="container mt-4 pb-5">{children}</div>
            <Footer />
            <Signin />
        </div>
    );
}
