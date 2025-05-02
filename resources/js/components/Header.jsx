import { Filters } from "./Filters";

import Banner from '../../images/banner-ecommerce.webp'
import './Header.css'

export function Header() {
    return (
        <>
            <div
                className="bg-secondary rounded position-relative banner-ecommerce"
            >
                <img className="rounded shadow position-absolute" src={Banner} alt="banner e-commerce" style={{
                    width: '100%',
                    height: '100%'
                }} />

                <h1 className="position-absolute text-white ms-4 mt-4 ms-md-5 mt-md-5 w-50 fw-bolder">
                    Compra fácil, sonríe siempre. ¡Descúbrelo ahora!
                </h1>
            </div>

            <Filters />
        </>
    );
}
