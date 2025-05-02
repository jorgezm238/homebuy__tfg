import { useCart } from "../hook/useCart";

import toast, { Toaster } from 'react-hot-toast';

import { CiShoppingBasket, CiTrash } from "react-icons/ci";

export function ProductManage({ product }) {
    const { hasProduct, addProductCart, removeProductCart } = useCart();

    const isProductInToCart = hasProduct(product);
    const typeButton = isProductInToCart ? 'danger' : 'secondary'

    return (
        <>
            <button
                className={`btn btn-${typeButton}`}
                onClick={
                    isProductInToCart ?
                    () => removeProductCart(product) :
                    () => {
                        addProductCart(product)
                        toast.success('Producto agregado al carro');
                    }
                }
            >
                {
                    isProductInToCart ?
                        <CiTrash className="fs-3" /> :
                        <CiShoppingBasket className="fs-3" />
                }
            </button>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    );
}
