## Live Stocks Dashboard

### Technologies used

React is used for designing the frontend with Redux being used as the state management paradigm.

### Github Repo and Hosting Info

The source code is available at https://github.com/codingHobbit/live-stocks-app with master branch and a gh-pages branch.
The gh-pages branch hosts the site.

The website is hosted at url - [https://codinghobbit.github.io/live-stocks-app/](https://codinghobbit.github.io/live-stocks-app/).

**Note: Because the app is connecting to the unsecured websocket url and github.io enforces https, please click "Load Unsafe Scripts" on the right side of url bar in chrome to see the app**

![Alt Click on Load Unsafe Scripts](/loadunsafescripts.PNG?raw=true "screenshot")
## Deployment Automation - TravisCI

The build and deployment is automated using TravisCI.
Whenever the code is pushed to the master branch, it automatically triggers a build of the master branch in the TravisCI.
When the build is successful, the travescibot automatically generates/updates the gh-pages branch of the project and the user is able to see the changes on the site.
