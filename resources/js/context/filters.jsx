import { createContext, useState } from 'react'

export const FiltersContext = createContext()

export function FiltersProvider({ children }) {
    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({
        minPrice: 0,
        category: "all",
    });

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters,
            categories,
            setCategories
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}
