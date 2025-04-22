const jwt = require("jsonwebtoken");
 const contents =
    {
        "name": "Aman",
        "accountNumber": 1234567890,
    }

const newToken = jwt.sign(contents, "ahbsdahb"); // Notice how the contents are the same as original jwt but the jwt password is different
console.log(newToken); 