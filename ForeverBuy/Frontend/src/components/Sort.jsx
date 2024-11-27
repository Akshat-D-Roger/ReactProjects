import { useSetRecoilState } from 'recoil'
import { selectedSortAtom } from '../store/atoms/filterAndSort'

const Sort = () => {
    const setSelectedSort = useSetRecoilState(selectedSortAtom)
  return (
    <select onChange={(e) => { setSelectedSort(e.currentTarget.value) }} className="py-2 px-4 text-sm rounded-sm border border-black">
      <option value="relevance">Sort by: relevance</option>
      <option value="lowToHigh">Sort by: low to high</option>
      <option value="highToLow">Sort by: high to low</option>
    </select>
  )
}

export default Sort