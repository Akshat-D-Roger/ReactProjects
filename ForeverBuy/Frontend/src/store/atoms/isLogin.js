import {atom} from 'recoil';

const isLoginAtom = atom({
    key:'isLoginAtom',
    default:false
})

const tokenAtom = atom({
    key:'tokenAtom',
    default:''
})


export {isLoginAtom, tokenAtom}