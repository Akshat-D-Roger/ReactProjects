import { atom } from "recoil";

const deliveryFeeAtom = atom({
    key:"deliveryFeeAtom",
    default: 10
})

const currencyAtom = atom({
    key:"currencyAtom",
    default: "$"
})



export {deliveryFeeAtom, currencyAtom}

