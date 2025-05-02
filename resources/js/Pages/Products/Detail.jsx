import { Link } from "@inertiajs/inertia-react";
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useCart } from "../../hook/useCart";

import { Products } from '../../components/Products'
import { ProductCount } from '../../components/ProductCount';
import { ProductManage } from '../../components/ProductManage';

import './Detail.css'

export default function Details({ product, productsSimilars }) {
    const { hasProduct } = useCart()

    const [imagenPreview, setImagenPreview] = useState(product.product_imagen[0].url_imagen)

    const viewImagenPreview = (imagen) => {
        document.startViewTransition(() => {
            flushSync(() => {
                setImagenPreview(imagen.url_imagen)
            })
        })
    }
    const imagenPreviewActive = (imagen) => imagen.url_imagen === imagenPreview ? 'border border-4 border-primary' : ''

    return (
        <>
            <div className="row g-0">
                <div className="col-12 col-xl-6">
                    <img className="rounded product-imagen" src={imagenPreview} />

                    <div className="mt-2 d-flex justify-content-center justify-content-xl-start gap-2 p-2 overflow-x-auto me-4">
                        {
                            product.product_imagen.map(imagen => {
                                return (
                                    <img className={`${imagenPreviewActive(imagen)} rounded`} style={{
                                        cursor: 'pointer'
                                    }} key={imagen.id_product_imagen} onClick={() => viewImagenPreview(imagen)} src={imagen.url_imagen} height={70} />
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col-12 col-xl-6 mt-3 mt-xl-0 border rounded d-flex align-items-start flex-column mb-3 p-3">
                    <div className="mb-auto">
                        <h1 className="text-uppercase">{product.name}</h1>
                        <p className="mb-0">{product.description}</p>
                        <h2 className="fw-light">${product.price}</h2>
                        <p>{product.category.name}</p>
                    </div>

                    {
                        hasProduct(product) &&
                            <ProductCount product={product} />
                    }

                    <div className="d-grid gap-2 py-2 w-100">
                        <ProductManage product={product} />
                    </div>
                </div>
            </div>

            {
                productsSimilars.length > 0 && (
                    <div className='my-xl-4'>
                        <h2 className='fw-light'>Productos Similares</h2>
                        <Products products={productsSimilars} />
                    </div>
                )
            }

            <div className="text-center mt-3 mt-md-0 mb-3">
                <Link href="/">Ver mas productos</Link>
            </div>
        </>
    )
}
