import { atom } from "recoil";

const filterObject = [
    {
        category:["Men", "Women", "Kids"]
    },
    {
        subCategory:["Topwear", "Bottomwear", "Winterwear"]
    }
]

function getDefaultFilters(){
    let filters = {};
        filterObject.forEach(item=>{
          let key = Object.keys(item)[0];
          filters[key] = [];
        })
    return filters;
}

const selectedFilterAtom = atom({
    key:'filterAtom',
    default:getDefaultFilters()
})

const filteredItemsAtom = atom({
    key:'filteredItemsAtom',
    default: []
})

const selectedSortAtom = atom({
    key:'selectedSortAtom',
    default:'relevance'
})

const sortedItemsAtom = atom({
    key:'sortedItemsAtom',
    default:[]
})




export {selectedFilterAtom,filterObject, filteredItemsAtom, selectedSortAtom ,sortedItemsAtom};