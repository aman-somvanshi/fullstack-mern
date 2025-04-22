// import  { atom, selector  } from "recoil";

// export const networkAtom = atom({
//     key: "networkAtom",
//     default: 104
// })
// export const jobsAtom = atom({
//     key: "jobsAtom",
//     default: 0
// })
// export const notificationAtom = atom({
//     key: "notificationAtom",
//     default: 12
// })
// export const messagingAtom = atom({
//     key: "messagingAtom",
//     default: 0
// })

// export const totalNotificationSelector = selector({
//     key : "totalNotificationSelector",
//     get: ({get}) => {
//         const networkAtomCount = get(networkAtom);
//         const jobsAtomCount = get(jobsAtom);
//         const notificationAtomCount = get(notificationAtom);
//         const messagingAtomCount = get(messagingAtom);

//         // the get function is used to get the value of the atom or selector. It ensures that any time the value of the atom or selector changes, the selector is re-evaluated.
//         return networkAtomCount + jobsAtomCount + notificationAtomCount + messagingAtomCount;
//     }
// })












// PART - 2 ----> ASYNC QUERIES

import { atom, selector } from "recoil";
import axios from "axios";

// run backend from 7.4-backend folder



export const notificationsAtom = atom({
    key : "networkAtom",
    default : selector({
        key: "networkAtomSelector",
        get: async () => {
            await new Promise(r => setTimeout(r, 3000)) // sleeps for 5 s
            // The purpose of the above line is to show the intial white screen (for 5 sec) which can be fixed with a loader (otherwise the white screen is less visible but still there)
            const response = await axios.get("http://localhost:3000/notifications");
            return response.data;
        }
    })
})

export const totalNotificationSelector = selector({
    key:  "totalNotificationSelector",
    get : ({get}) => {
        const allNotifications = get(notificationsAtom);
        
        return allNotifications.network + allNotifications.jobs + allNotifications.messaging + allNotifications.notifications; 
    }
})