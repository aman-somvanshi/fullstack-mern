import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
// import { jobsAtom, messagingAtom, networkAtom, notificationAtom, notifications, notificationsAtom, totalNotificationSelector } from "./atoms"
import {  notificationsAtom, totalNotificationSelector } from "./atoms"
// import { useMemo } from "react";
import { useEffect} from "react";

import axios from "axios";


function App() {

  

  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

// function MainApp() {

//   const networkNotificationCount = useRecoilValue(networkAtom);

//   const jobsNotificationCount = useRecoilValue(jobsAtom);

//   const messagingNotificationCount = useRecoilValue(messagingAtom);

//   // const [notificationCount, setNotificationCount] = useRecoilState(notificationAtom);
//   const notificationCount = useRecoilValue(notificationAtom);

//   const totalNotificationCount = useRecoilValue(totalNotificationSelector);
//   // const totalNotificationCount = useMemo( () => {
//   //   return networkNotificationCount + jobsNotificationCount + messagingNotificationCount + notificationCount;
//   // }, [networkNotificationCount, jobsNotificationCount, messagingNotificationCount, notificationCount])


//   return  (
//   <>
//     <button>Home</button>

//     <button>My network ({networkNotificationCount >=100 ? "99+" : networkNotificationCount})</button>
//     <button>Jobs ({jobsNotificationCount >=100 ? "99+" : jobsNotificationCount})</button>
//     <button>Messages ({messagingNotificationCount >=100 ? "99+" : messagingNotificationCount})</button>
//     <button>Notifications ({notificationCount >=100 ? "99+" : notificationCount})</button>

//     <ButtonUpdater />
//     <button>Me ({totalNotificationCount})</button>
//   </>

// )}

// function ButtonUpdater() {

//   const setNotificationCount = useSetRecoilState(notificationAtom);
//   return <>
//     <button onClick={ () => {
//       setNotificationCount(c => c+1)
//     }}>Increase Notification Count</button>
//   </>
// }








// PART - 2 ----> ASYNC QUERIES




function MainApp() {

  const [networkCount , setNetworkCount] = useRecoilState(notificationsAtom);

  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  return <>
    <button>My network ({networkCount.network >= 100 ? "99+" : networkCount.network})</button>

    <button>Jobs ({networkCount.jobs})</button>
    <button>Messaging ({networkCount.messaging})</button>
    <button> Notifications ({networkCount.notifications})</button>
    <button> Me ({totalNotificationCount})</button>
  </>
  
}

export default App
