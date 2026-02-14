** related to all env changes
we have 4 repo
livechat backend
livechat frontend
Backoffice
Eci88v3 clients app

App 1 env(This we already setup)
MONGO_URI=mongodb://localhost:27017
MONGO_URI_OPTION=""
ACCESS_TOKEN_SECRET=ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET=REFRESH_TOKEN_SECRET

App2 env(This repo need to be deployed)
REACT_APP_LIVECHAT_API_URL=url of App1(livechat backend)

App3(Backoffice env)
VITE_APP_SITE_NAME = "DEV"
VITE_APP_LIVECHAT_FE_URL=url of App2(livechat frontend)

App4(User App FE - ECI88V3)
VITE_APP_SITE_NAME = "DEV"
VITE_APP_LIVECHAT_FE_URL=url of App2(livechat frontend)
VITE_APP_CONTACTUS_OPTION=customlivechat 
#   "supportboard", "customlivechat", "social"