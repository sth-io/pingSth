![Ping Sth](https://raw.githubusercontent.com/sth-group/pingSth/master/_docs/logo.png "PingSth")
# PingSth
Don't want to let your users run due to server downtime? PingSth will notice you of **every problem with connection** to your server. Its opensource so you'll know what lays inside and host your data on yours server.


# Setup
1. clone our repo
2. ``` cd serv/ ```
3. ``` sudo npm install```
4. install mongodb
5. setup mongodb data in config file
6. run app.js
7. setup apache for ```app/``` folder
8. see it in browser.
Have a happy using!

# API

##/api/user/
**.POST**
user register
```javascript
{
    "email": String,
    "password": String
}

```
**.GET**
get logged in user data
```javascript
{
    "email": String,
    "password": String,
    "token": String

}
```
##/api/auth/
**.POST**
user register
```javascript
{
    "email": String,
    "password": String
}
```
returns TOKEN
##/api/status/:website_id
**.GET**
returns website status.
Website_id can be taken from /api/websites
```
##/api/websites
**.GET**
returns websites user own.
```
##/api/websites
**.POST**
adds a new website to users account.
```javascript
{
    "website": "http://example.com"
    "timeout": Int
}
```
timeout counts in minutes.

```
