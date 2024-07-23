const jwt = require("jsonwebtoken");
const JWT_SECRET = "Random@TokenSecret12324567899";

fetchuser = (req, res, next) => {
    //Get the user from the jwt tocken and add id to req object

    // Step 1: Retrieve the token from the request header
    const token = req.header('auth-token')
    if(!token) {
        // If no token is provided, respond with a 403 status code and an error message
        res.status(403).send({error: "Please authenticate using a valid token"})
        // Ensure the function exits here if there's no token
    }

    try {
        // Step 2: Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET)
        // Step 3: Add the user data to the request object
        req.user = data.user;
        // Step 4: Call the next middleware or route handler
        next()
    } catch (error) {
        // If the token is invalid or verification fails, respond with a 401 status code
        res.status(401).send({error: "Please authenticate using correct token"})
    }

}

module.exports = fetchuser;