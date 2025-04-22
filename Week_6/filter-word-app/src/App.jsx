import { useState, useMemo} from "react"

const ALL_WORDS = ["Hello", "I", "am", "the", "Half", "Blood", "Prince"]
const lines = 1000;
let finalSentences = [];
for(let i=0;i<lines;i++){
  let sentence = "";
  for(let j=0;j<ALL_WORDS.length;j++){
    sentence += ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    sentence += " ";
  }
  finalSentences.push(sentence);
}

function App() {

  const [words, setWords] = useState(finalSentences);
  const [filter, setFilter] = useState("");

  const filteredSentences = useMemo(function () {
     return words.filter(word => word.includes(filter))
  }, [filter, words]);

  return (
    <>
      <input type="text" placeholder="Enter a word" onChange={function(e) {
        setFilter(e.target.value);
      }}></input>

      <div>
        {filteredSentences.map(sentence => <div>{sentence}</div>)}
      </div>
    </>
  )
}

export default App
