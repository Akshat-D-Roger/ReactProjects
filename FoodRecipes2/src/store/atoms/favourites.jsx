import { atom } from "recoil";

const favouritesAtom = atom({
    key:"favouritesAtom",
    default:[]
});

export default favouritesAtom