# iNotebook (Notes of Cloud) 

A cloud-based sticky note app designed for speed and simplicity. With secure login and signup features powered by an exclusive invite code system, this app ensures that each user enjoys a private, individual space for their notes, free from prying eyes. Its minimalist design and lightning-fast performance make it the perfect tool for capturing and organizing your thoughts on the go.

## Setting up the environment

* ### Playing with Variable
    * server > **db.js** 
    
        Edit your **mongoURI** with your connection string. For example: `mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority`
    
    * server > **PORT**

        Change the desirable port on the server 

    * server > routes > **JWT_SECRET**

        Provide your JWT credentials to the server so that you can create an authentication token for users. For example: `"Random@12324567899"`

* ### Miscellaneous
    * client > src > components > **Signup.js** 

        Change the `credentials.invite !== "INVITE50"` to your desired invite code. 

<br>

> ⚠️ Remember to change all the `http://localhost:5000` to the server link otherwise the server will fail.

## Starting the server

To start the server visit **client** and ensure that **package.json** is available. 

`npm install` to install the required packages. (Do the same thing with the server folder.)

```powershell
npm install
```

After returning to client folder execute `run both` because we are defining both to run the server and the client at the same time using **concurrently (npm package)**.

```powershell
npm run both
```

## Troubleshooting 

_If you found this repo then I think you should do the troubleshooting by yourself. There is no easy way or shortcut to learning._