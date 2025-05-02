import { Product } from "./Product";

export function Products({ products }) {
    return (
        <div className="row">
            {products.map((product) => {
                return <Product product={product} key={product.id_product} />;
            })}
        </div>
    );
}
