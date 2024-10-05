import { useRecoilState } from "recoil";
import { selectedFilterAtom } from "../store/atoms/filterAndSort";

const FilterComp = ({ item }) => {

    const filterType = (Object.keys(item))[0];
    const filterValues = item[filterType];
    const [selectedFilter, setSelectedFilter] = useRecoilState(selectedFilterAtom);

    function handleFilterChange(value) {
        setSelectedFilter(prev => {
            // let updatedFilter = {...prev};
            //the above only creates a shallow copy and not deep copy , so you would not be able to update the value in array
            let updatedFilter = JSON.parse(JSON.stringify(prev));
            if (updatedFilter[filterType].includes(value)) {
                updatedFilter[filterType] = updatedFilter[filterType].filter(item => (item !== value))
            }
            else {
                (updatedFilter[filterType]).push(value);
            }
            return updatedFilter;
        });
    }


    return (
        <div className={`border-2 py-4 px-6`}>
            <div className='font-medium'>{filterType}</div>
            <div className='mt-[1rem] flex flex-col gap-4 items-start'>
                {filterValues.map((value, index) => {
                    return (
                        <label key={index} className='flex flex-row gap-3 items-center text-sm text-gray-500'>
                            <input type="checkbox" onChange={() => handleFilterChange(value)} checked={selectedFilter[filterType].includes(value)} />
                            {value}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default FilterComp