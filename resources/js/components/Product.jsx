import { Link } from "@inertiajs/inertia-react";
import { useCart } from "../hook/useCart";
import { ProductCount } from "./ProductCount";
import { ProductManage } from "./ProductManage";

import { CiViewTimeline } from "react-icons/ci";

import './Product.css'

export function Product({ product }) {
    const { hasProduct } = useCart()

    return (
        <div className="product mt-4">
            <div className="card border-0 shadow">
                <img
                    className="border rounded bg-secondary"
                    style={{ height: "160px" }}
                    src={product.product_imagen[0].url_imagen}
                ></img>

                <div className="mt-1 container">
                    <span className="fs-5 fw-semibold">{product.name}</span>
                    <p className="mb-0 text-truncate">{product.description}</p>
                    <span className="fs-4 fw-bold">${product.price}</span>
                    <p className="mb-1 fw-semibold">
                        <span className="fw-normal">
                            {product.category.name}
                        </span>
                    </p>

                    {
                        hasProduct(product) &&
                            <ProductCount product={product} />
                    }
                </div>

                <div className="mt-1 d-flex justify-content-center gap-1 pb-2">
                    <Link
                        className="btn btn-primary"
                        href={`/products/${product.id_product}`}
                    >
                        <CiViewTimeline className="fs-4" />
                    </Link>

                    <ProductManage product={product} />
                </div>
            </div>
        </div>
    );
}
