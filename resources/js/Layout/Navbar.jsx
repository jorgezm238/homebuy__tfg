import { Link } from "@inertiajs/inertia-react";
import { useAuth } from "../hook/useAuth";
import { Search } from "./components/Search";
import { UserLinks } from "./components/UserLinks";

import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../hook/useCart";

export function Navbar() {
    const { isAuth, user, logout, token } = useAuth()
    const { cart } = useCart()

    return (
        <nav className="navbar bg-body-secondary navbar-expand-lg position-sticky top-0 shadow-sm" style={{
            zIndex: '1000'
        }}>
            <div className="container">
                <Link className="navbar-brand m-auto" href="/">
                    Simple Online Store
                </Link>

                <Search />

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
                    <ul className="navbar-nav mt-3">
                        <li className="nav-item">
                            <Link className="nav-link " href="/cart" title="Carrito de compras">
                                <span className="position-relative me-2">
                                    <CiShoppingCart className="fs-3" />

                                    {
                                        cart.products.length > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.products.length}</span>
                                        )
                                    }
                                </span>
                            </Link>
                        </li>

                        {
                            isAuth() ?
                            <UserLinks user={user} token={token} logout={logout} /> :
                            <li className="nav-item">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signin">Ingresar</button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}
