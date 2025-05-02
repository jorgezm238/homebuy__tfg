import { Link } from "@inertiajs/inertia-react";
import { useCart } from "../../hook/useCart";

import { CiTrash, CiCircleCheck, CiRedo } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { createCart } from "../../services/cart";

export default function Cart() {
    const { cart, addProductCart, decreaseAmount, removeProductCart, cleanCart, getTotalPriceCart } = useCart();

    const total = getTotalPriceCart(cart.products)

    const cleanAllCart = () => {
        cleanCart()
    }

    const sendShop = async () => {
        try {
            const response = await createCart(cart)
            toast.success(response.data.message)
            cleanCart()
        } catch(err) {
            if (err.response.data.message === 'Unauthenticated.') {
                return toast.error('Debe identificarse, para completar la orden')
            }

            toast.error(err.response.data.message)
        }
    }

    return (
        <div className="border p-3 p-md-5 rounded mb-4">
            <div className="mb-2">
                <Link href="/">Continuar Comprando</Link>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-md-between">
                <div>
                    <h2>Carrito de compras</h2>
                    <p className="mb-1">
                        Tienes <span>{cart.products.length}</span> productos en tu carro
                    </p>
                    <p className="fs-4">Total: ${total}</p>
                </div>
                <div className="text-center text-md-start">
                    {
                        total > 0 && (
                            <>
                                <button className="border-0 bg-white me-2" onClick={cleanAllCart}>
                                    <CiRedo className="fs-3" />
                                </button>
                                <button className="btn btn-primary" onClick={sendShop}>
                                    <CiCircleCheck className="fs-3" /> Finalizar Compra
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="mt-4 mt-md-2">
                {cart.products.map((product) => (
                    <div className="row g-0 rounded border mb-3" key={product.id_product}>
                        <div className="col-12 col-md-6 flex-grow-1 d-flex gap-3">
                            <img
                                className="rounded"
                                src={product.product_imagen[0].url_imagen}
                                height={100}
                                width={100}
                            />
                            <div className="my-auto w-50">
                                <h3 className="fs-4 text-capitalize mb-0">
                                    {product.name}
                                </h3>
                                <p className="text-secondary text-truncate text-sm mb-0 text-truncate">
                                    {product.description}
                                </p>
                                <Link href={`/products/${product.id_product}`}>
                                    Ver producto
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 my-3 my-md-0 col-md-5 col-xl-3 d-flex gap-3 align-items-center justify-content-center">
                            <button className="btn border px-3" onClick={() => decreaseAmount(product)}>-</button>
                            <input
                                className="form-control text-center w-25"
                                type="text"
                                value={product.count}
                                readOnly
                            />
                            <button className="btn border px-3" onClick={() => addProductCart(product)}>+</button>
                        </div>
                        <div className="col-12 col-xl-3 my-auto text-center">
                            <span className="fw-bold fs-5 me-3 mb-0">${product.price}</span>
                            <button className="btn btn-danger mb-2 mb-md-0" onClick={() => removeProductCart(product)}>
                                <CiTrash className="fs-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    );
}
