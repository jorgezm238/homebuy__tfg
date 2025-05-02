import { Link } from "@inertiajs/inertia-react";
import { CiUser, CiPower, CiShoppingBasket, CiViewTimeline } from "react-icons/ci";

export function UserLinks({ user, token, logout }) {
    const header = { Authorization: `Bearer ${token}` }

    return (
        <li className="nav-item my-auto">
            <div className="dropstart">
                <button
                    className="rounded-circle bg-dark bg-gradient border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <CiUser className="fs-4 mx-0 m-1 text-white" />
                </button>
                <ul className="dropdown-menu me-2">
                    <li>
                        <div className="border-bottom mx-3 mt-1 mb-1 pb-1">
                            <h2 className="fs-6 mb-0">{user.name}</h2>
                            <div
                                className="text-secondary fw-light"
                                style={{
                                    fontSize: ".8rem",
                                }}
                            >
                                {user.email}
                            </div>

                            <Link
                                className="btn fw-semibold p-0 d-flex gap-1 mt-1 align-items-center"
                                headers={header}
                                style={{
                                    fontSize: ".93rem",
                                }}
                                href="/orders"
                            >
                                <CiShoppingBasket className="fs-5" />
                                <span className="fw-light">Ordenes</span>
                            </Link>

                            <Link
                                className="btn fw-semibold p-0 d-flex gap-1 mt-1 align-items-center"
                                headers={header}
                                style={{
                                    fontSize: ".93rem",
                                }}
                                href="/profile"
                            >
                                <CiViewTimeline className="fs-5" />
                                <span className="fw-light">Perfil</span>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <button
                            className="btn fw-semibold mx-3 p-0 d-flex gap-1 mt-1 align-items-center"
                            style={{
                                fontSize: ".93rem",
                            }}
                            type="button"
                            onClick={async () => {
                                await logout()
                                window.location.reload()
                            }}
                        >
                            <CiPower className="fs-5" />
                            <span className="fw-light">Cerrar Sesión</span>
                        </button>
                    </li>
                </ul>
            </div>
        </li>
    );
}
