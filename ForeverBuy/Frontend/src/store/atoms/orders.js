import {atom} from 'recoil'

const ordersAtom = atom({
    key:'ordersAtom',
    default:[]
})

export {ordersAtom}