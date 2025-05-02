import { useCart } from "../hook/useCart";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

export function ProductCount({ product }) {
    const { cart, decreaseAmount, addProductCart } = useCart()

    const productCart = cart.products.find(item => item.id_product === product.id_product)
    const count = productCart !== undefined ? productCart.count : 1

    return (
        <div className="d-flex gap-1 align-items-center my-2 w-100">
            <p className="my-auto flex-fill">
                Cantidad: <span className="fw-bold">{count}</span>
            </p>

            {
                count > 1 && (
                    <button
                        className="btn btn-sm p-0"
                        onClick={() => decreaseAmount(product)}
                    >
                        <CiSquareMinus className="fs-2" />
                    </button>
                )
            }

            <button
                className="btn btn-sm p-0"
                onClick={() => addProductCart(product)}
            >
                <CiSquarePlus className="fs-2" />
            </button>
        </div>
    );
}
