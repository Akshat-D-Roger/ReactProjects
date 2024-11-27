import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useEffect, useRef } from "react";
import { filteredItemsAtom, maxPriceAtom, minPriceAtom, selectedFilterAtom, selectedSortAtom, sortedItemsAtom } from "../atoms/filterAndSort";
import { allOrSearchedProducts } from "../atoms/search";

export function useCollection(){
    const products = useRecoilValue(allOrSearchedProducts);
    const firstRender = useRef(true)

    const selectedFilters = useRecoilValue(selectedFilterAtom);
    const [filteredItems, setFilteredItems] = useRecoilState(filteredItemsAtom);
    const resetFilters = useResetRecoilState(selectedFilterAtom);

    const selectedSort = useRecoilValue(selectedSortAtom)
    const [sortedItems, setSortedItems] = useRecoilState(sortedItemsAtom)
    const resetSort = useResetRecoilState(selectedSortAtom)

    const minPrice = useRecoilValue(minPriceAtom)
    const maxPrice = useRecoilValue(maxPriceAtom)
    const resetMinPrice = useResetRecoilState(minPriceAtom)
    const resetMaxPrice = useResetRecoilState(maxPriceAtom)

    //////////////////////////////////////////////////////////////////////////////////////////////////

    function filterProducts() {
        let tempProducts = products;
        (Object.keys(selectedFilters)).forEach(item => {
        let filterType = item;
        let filterValue = selectedFilters[item];
        if (filterValue.length > 0) {
            tempProducts = tempProducts.filter(product => {
            return filterValue.includes(product[filterType])
            })
        }
        });
        // price filter
        tempProducts =  tempProducts.filter((item)=>{
            const price = item.price;
            const min = minPrice ? parseInt(minPrice) : 0;
            const max = maxPrice ? parseInt(maxPrice) : 10000;
            return price >= min && price <= max;
        })
        setFilteredItems(tempProducts);
    }

    function sortProducts() {
        let filteredItemsCopy = filteredItems.slice();
        switch (selectedSort) {
        case 'highToLow':
            setSortedItems(filteredItemsCopy.sort((a, b) => (b.price - a.price)))
            break;

        case 'lowToHigh':
            setSortedItems(filteredItemsCopy.sort((a, b) => (a.price - b.price)))
            break;

        default:
            setSortedItems(filteredItemsCopy);
            break;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        return () => { 
            resetFilters()
            resetSort() 
            resetMaxPrice()
            resetMinPrice()
        }
    }, [])

    useEffect(() => {
        filterProducts();
    }, [selectedFilters, products, minPrice, maxPrice])

    useEffect(() => { 
        if(firstRender.current){
            firstRender.current = false;
            return;
        }
        sortProducts();
    }, [selectedSort,filteredItems])

    return {sortedItems}
}