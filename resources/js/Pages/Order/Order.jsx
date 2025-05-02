import { CiCircleChevRight } from "react-icons/ci";
import { Link } from "@inertiajs/inertia-react";
import { useAuth } from "../../hook/useAuth";
import { useCart } from "../../hook/useCart";
import { getFormatDate } from "../../utils/helpers";

export default function Order({ carts }) {
    const { token } = useAuth()
    const { getTotalPriceCart } = useCart()

    const getStatusColor = (status) => {
        const STATUS_COLOR = {
            'ESPERA': 'text-primary',
            'FINALIZADO': 'text-success',
            'ABANDONADO': 'text-danger'
        }

        return STATUS_COLOR[status]
    }

    return (
        <div className="border rounded p-4 p-md-5 mb-4">
            <h1 className="fw-normal mb-0">Lista de compras</h1>
            <p className="mb-4 fw-semibold text-secondary">Total de {carts.length} compras</p>

            {
                carts.map((cart, index) => (
                    <div className="d-flex rounded gap-2 gap-md-4 shadow mb-4" key={index}>
                        <div className="" style={{
                            width: '9.9rem'
                        }}>
                            <img
                                className="rounded shadow" key={index}
                                src={cart.cart_product[0].product.product_imagen[0].url_imagen}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </div>
                        <div className="flex-fill">
                            <h2 className="fw-bold mb-0">#000{cart.id_cart}</h2>
                            <p className={`mb-0 fw-semibold ${getStatusColor(cart.status)}`} style={{
                                fontSize: '.8rem'
                            }}>{cart.status}</p>

                            <div className="mt-2 mb-2">
                                <p className="mb-0 text-secondary fw-light" style={{
                                    fontSize: '.9rem'
                                }}>{getFormatDate(cart.created_at)}</p>
                                <span className="">Total: ${getTotalPriceCart(cart.cart_product)}</span>
                            </div>
                        </div>
                        <div className="m-auto pe-0 pe-md-3 pe-xl-5">
                            <Link className="btn" href={`/orders/${cart.id_cart}`} headers={{ 'Authorization': `Bearer ${token}` }} >
                                <CiCircleChevRight className="fs-2" />
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
