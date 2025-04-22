import { atomFamily } from "recoil";
import { TODOS } from "./todos";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  // The default value in an atomFmaily is no longer a value but it is a function
  default: id => {
    return TODOS.find(x => x.id === id)
  },
  // So basically the atomFamily says give me a input, tell me which atom you want using that input and i will return you back the default value for that atom
});