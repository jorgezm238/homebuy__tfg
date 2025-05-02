import { useContext } from 'react';
import { FiltersContext } from '../context/filters';

export function useFilters() {
    const { filters, setFilters, categories, setCategories } = useContext(FiltersContext)

    const filtersProducts = (products) => {
        return products.filter(product => (
            product.price >= filters.minPrice && (
                product.category.name === filters.category
            )
        ))
    }

    return { filtersProducts, filters, setFilters, categories, setCategories }
}
