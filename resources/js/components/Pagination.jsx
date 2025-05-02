import { Link } from "@inertiajs/inertia-react";
import htmr from 'htmr'

export function Pagination({ links }) {
    const isActive = (active) => active ? 'page-item active' : 'page-item'

    return (
        <>
            {links.length > 3 && (
                <ul className="pagination pagination-sm mt-4">
                    {links.map((link, index) => {
                        return link.url === null ? (
                            <li className="page-item disabled" key={index}>
                                <Link className="page-link" href="#">{htmr(link.label)}</Link>
                            </li>
                        ) : (
                            <li className={isActive(link.active)} key={index}>
                                <Link className="page-link" href={link.url}>{htmr(link.label)}</Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}
