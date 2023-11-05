# Deployment
This webapp is deployed on onrender. You can visit it at [https://findapet-hsme.onrender.com/petlistings](https://findapet-hsme.onrender.com/petlistings/).
## Pre-deployment Adjustments
### Adjusting the API URL
In order to deploy the webapp, the API URL had to be changed from `http://localhost:8000/api` to `/api` in each of the files in the `src` folder. This is because the API is hosted on the same server as the webapp, so the API URL is the same as the webapp URL.
### Package Issues
A required package, `'@fortawesome/fontawesome-svg-core`, was not installing properly on the server. This was fixed by running the following commands:
```jsx
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
```
 saving the package to the `package.json` file, and then redeploying the webapp.

## Deployment Process
The deployment process was very simple. We chose onrender due to their "free" plan which allowed us to deploy free of cost. In order to access this free plan an account is required. The webapp was deployed by connecting the GitHub repository to onrender, and then deploying the webapp from the onrender dashboard. 

### Settings
The settings for the webapp were configured in the onrender dashboard. The webapp was configured to be deployed from the `main` branch of the GitHub repository. The build command was set to `npm install && npm run build` and the start command was set to `npm run start`.

### The .env File
The `.env` file was not deployed to GitHub, so it had to be manually configured on the server. On the onrender dashboard, there is a section for environment variables. The variables in the `.env` file were copied into the onrender environment variables section, and the webapp was deployed.

## For more information
To find out more about the deployment process, visit [https://render.com/docs/web-services](https://render.com/docs/web-services).

Find-A-Pet project details can be seen in the [README.md](README.md) file in this repository.