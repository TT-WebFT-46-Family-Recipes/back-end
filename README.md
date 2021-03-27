# back-end

# Full Stack App Heroku

​
**Steps for creating a full stack app and deploying to Heroku**
​
Repo Link: [GitHub Gabe Web39](https://github.com/Ladrillo/web39)
​
Lecture Link: [Deploying to Heroku with Gabe](https://www.youtube.com/watch?v=HUT1A9OUwtk)
​

1. `mkdir` to create the project folder
2. Create gitignore file with `npx gitignore node`
   1. Add `.DS_store` if you're on a mac
3. Run `git init` to initialize repo
4. Run `git checkout -b main` if you want to rename master to main
5. Check repo has been initialized by checking `.git` exists with `ls -lha`
6. Create `package.json` with `npm init -y`
7. Add eslint with `npx eslint --init` and configure it:
   1. Choose default second option (syntax and problems) and hit enter
   2. CommonJS
   3. None of these
   4. No TypeScript
   5. Node
   6. JSON
   7. Yes
8. Add nodemon with `npm i -D nodemon`
9. Install other dependencies `npm i express cors dotenv`
10. Create a start and server script in package.json:
    ​
    `jsx "start": "node index.js" "server": "nodemon index.js" `
    ​
11. Create index.js and test that it works with `console.log()` and `npm run server`
12. In the index.js file:
    1. Import express and cors
    2. Instantiate server
    3. Set middleware (express.json and cors) → cors can be conditional on development env
13. Configure environment variables: 1. Create .env file in the root folder 2. Add `NODE_ENV=development` (note you only need quotes if string has spaces) 3. Require `dotenv` in index.js with `require('dotenv').config()` 4. Since we're doing a full stack app, make cors conditional on development:
    ​
    `jsx if (process.env.NODE_ENV === 'development') { const cors = require('cors') server.use(cors()) } `
    ​
14. Dynamically define a PORT variable:
    ​
    `` jsx // index.js const PORT = process.env.PORT || 4000; ​ server.listen(PORT, () => { console.log(`listening on ${PORT}`); }) ​ // .env PORT=5000  ``
    ​
15. Write a generic endpoint to test the server, for example:
    ​
    `jsx server.use('*', (req, res) => { res.send('<h1>success</h1>') }) `
    ​
16. Go to GitHub and create a project repo
17. Use `git remote add origin <link>` to add the remote repo locally in the CLI
18. Run `git push origin main` and GitHub should now be tracking
19. Go to Heroku and create an app → Deploy tab → use GitHub
20. Search for your repo, select the one for deployment and click connect
21. Use manual deploy so it doesn't deploy with every push
22. _Optional: can specify engines in package.json to specify node and npm_
23. Create a folder called "client" or "frontend"
24. Move into that folder
25. Run `npx create-react-app .`
26. _Side note: to check npm global installs run `npm list -g`_
27. Confirm that git didn't create another repo with `ls -lha` in side client folder
28. Import path in index.js with `const path = require('path')`
29. Tell express where static assets are with `server.use(express.static(path.join(__dirname, 'client/build')))`
30. Inside the client folder, run `npm run build`
31. Add a generic endpoint to the server:
    ​
    `jsx server.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'client/build', 'index.html')) }) ​ // this will serve the react app from our web app `
    ​
32. Note that we can add other endpoints before the above in #31 to handle database calls and data fetching by our react app (thanks to `cors`, those won't be available for public consumption via the browser but will be available to the react app to use as its API)
33. Add the Heroku script:
    ​
    `jsx "heroku-postbuild": "cd client && npm i && npm run build" `
    ​
34. Now we can deploy the react app to Heroku
35. Hitting the API with the react app 1. Use a helper function to determine if we're in development
    ​
    `jsx function getUrl(path) { if (process.env.NOVE_ENV === 'development') { return 'http://localhost:5000' + path } return path } ​ ... // inside the useEffect: fetch(getUrl('/api/hello')) // pass in the relative path .then() .catch() `
    ​ 2. Push again and deploy to Heroku
