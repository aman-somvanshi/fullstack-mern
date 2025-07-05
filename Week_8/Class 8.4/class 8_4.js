// In this session, we will be completing the frontend part of our paytm project we made in class 8.2

// Note that if you want to center a component, you should first give it height using (h-full or something like that) .

// onChange is a React event handler that triggers when the value of an input element changes — like a text box, checkbox, select dropdown, etc.
// It is React’s way of handling input changes to keep UI and state in sync.
// e.target.value is the current input value.

// you can use onChange with <input>, <select>, <textarea>.

// We are using localStorage to persistently store the authentication staate of the user. If the token is stored in the localStorage, it means that the user is logged in. If the token is not there, then the user is logged out.

// localStorage.setItem(key: string, value: string);
// localStorage.removeItem(key: string);

// We need to make sure that for authenticated paths, the token is sent along with every request.





// 🧠 Navigation Table

// 1. Link – Declarative Navigation

// Comes from react-router-dom
// Used in JSX to create navigation elements (like anchor tags) like when we click on Sign In text.
// Equivalent to <a href="..."> but without page reload
// Use in your JSX when you want to navigate visually (like buttons, menus, or navbars).


// 2. useNavigate – Imperative Navigation
// A React hook used inside a function component
// Allows programmatic navigation (e.g., after a login or a button click)
// Use After form submissions, API calls, or conditional navigation.



// 3. history – Legacy (React Router v5 and below)
// In older React Router versions, history.push() was used instead of useNavigate()
// In v6+, useNavigate() replaced direct use of history
// props.history.push("/dashboard");






// ✅ useSearchParams in React Router (v6+)
// useSearchParams is a React Router hook that lets you read and update query parameters (?key=value) in the URL — without reloading the page.
// const [searchParams, setSearchParams] = useSearchParams();

// searchParams.get(key)	Get the value of a query param
// setSearchParams(obj)	Set or update query params
// searchParams.has(key)	Check if a param exists
// searchParams.toString()	Get full query string


// Check online the usage of /me endpoint to ensure that a loggedin user is not able to access the sign up-sign in pages unless he  logs out.

// Also when user reaches "/" path, the user should be redirected to either sign in page or to dashboard page, based on whether or not they are logged in. 