
import './App.css'

function App() {
  

  return (
    <>
      {/* This is one way of making wrappers but it is usually not used  */}

      {/* <CardWrapper innerComponent={<TextComponent />}></CardWrapper>
      <CardWrapper innerComponent={<TextComponent2 />}></CardWrapper> */}

      <CardWrapper>
        <div>
        Hi There
        </div>
      </CardWrapper>

      <CardWrapper>
        <div>
        Hello There
        </div>
      </CardWrapper>

      <CardWrapper>
        <TextComponent/>
      </CardWrapper>
      
    </>
  )
}

// function TextComponent(){
//   return <div>
//     Hi There
//   </div>
// }
// function TextComponent2(){
//   return <div>
//     Hi There 2
//   </div>
// }

// function CardWrapper({innerComponent}) {
//   return <div style={{
//     backgroundColor: "black",
//     color: "white",
//     border: "2px solid #ddd",
//     width: 200,
//     height: 200,
//   }}>
//     {innerComponent}
//   </div>
// }

function CardWrapper({children}){
  // console.log(children);
  return <div style={{
    backgroundColor: "black",
    color: "white",
    border: "2px solid #ddd",
    width: 200,
    height: 200,
  }}>
    {children}
  </div>
}

// The children prop basically contains all the children of the component.

function TextComponent(){
  return <div>
    Hii from the text component
  </div>
}

export default App
