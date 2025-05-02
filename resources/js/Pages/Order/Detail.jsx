import { Link } from "@inertiajs/inertia-react";
import { useCart } from "../../hook/useCart";

import { getFormatDate } from "../../utils/helpers";

export default function Detail({ cart }) {
    const { getTotalPriceCart } = useCart()

    return (
        <div className="border p-3 p-md-5 rounded gap-0">
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <p className="mb-0 text-secondary">{getFormatDate(cart.created_at)}</p>
                    <p className="mb-0 fw-bold">Nro. de Orden</p>
                    <h1 className="fs-2 mb-0 fw-light">#000{cart.id_cart}</h1>
                </div>
                <div className="mt-3">
                    <p className="fw-light mt-0 fs-4 mb-0">Total: ${getTotalPriceCart(cart.cart_product)}</p>
                    <p className="fw-light">Total de {cart.cart_product.length} productos</p>
                </div>
            </div>

            {
                cart.cart_product.map((cartProduct, index) => (
                    <div className="row shadow mb-3 g-0" key={index}>
                        <img className="col-12 col-md-2 border rounded" src={cartProduct.product.product_imagen[0].url_imagen} />

                        <div className="col-12 col-md-6 ps-3 m-auto">
                            <h2 className="mb-1">
                                <Link href={`/products/${cartProduct.product.id_product}`}>{cartProduct.product.name}</Link>
                            </h2>
                            <p className="mb-0 mb-md-3">{cartProduct.product.category.name}</p>
                        </div>

                        <div className="col-12 col-md-4 text-center mb-2 text-md-start m-auto">
                            <p className="fs-5 mb-0">Cantidad: {cartProduct.count_product}</p>
                            <p className="fw-light mb-0">Precio: ${cartProduct.price_product}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
