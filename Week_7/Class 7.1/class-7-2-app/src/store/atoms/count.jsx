// import {atom} from "recoil"
import {atom, selector} from "recoil"

export const countAtom = atom({
    key: "countAtom",
    default: 0
}) // key for every atom you define in an application should be different 

export const evenSelector = selector({
    key: "evenSelector",
    get: (props) => {
        const count = props.get(countAtom); // Like we use dependency in useMemo, here we use props.get
        return (count % 2 == 0);
    }
})