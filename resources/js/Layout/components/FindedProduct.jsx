import { Link } from "@inertiajs/inertia-react";

export function FindedProduct({ product, setShowResult }) {
    return (
        <div
            className="d-flex gap-2 border-bottom mb-1 pb-1"
        >
            <img
                className="rounded"
                src={product.product_imagen[0].url_imagen}
                height={50}
                width={50}
            />
            <div className="d-flex flex-column">
                <Link
                    className="text-capitalize"
                    href={`/products/${product.id_product}`}
                    onClick={() => setShowResult(false)}
                >
                    {product.name}
                </Link>
                <p className="mb-0">{product.description.slice(0, 39)}...</p>
            </div>
        </div>
    );
}
