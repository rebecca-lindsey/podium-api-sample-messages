# Sample Integration: Send Messages


## About the Integration
This repository provides a quick solution that will allow messages (SMS or Email) to be send to end users
to Podium. The integration uses the <a href="https://docs.podium.com/reference/messagesend-1">send a message</a>
You can learn more about the message object by accessing
our <a href="https://docs.podium.com/reference/the-message-object">API reference docs</a>


## Get Started
If it is your first time using Podium API, checkout our <a href="https://docs.podium.com/docs/getting-started">Get Started Guide</a> to get your credentials and understand our scope.

## Running Locally
### 1. Get your developer account 
In order to make https requests make sure you have a developer account and the following keys:
<ul>
  <li>ClientId</li>
  <li>ClientSecret</li>
  <li>RefreshToken</li>
</ul>

### 2. Setup local project
```html
<!--Clone this repository-->
git clone https://github.com/podium/podium-api-demo-contacts.git

<!--Go to the repository directory-->
cd ~/podium-api-demo-contacts
 
<!--Create https server with SSL certificate - Podium requires https requests
Create a folder name certs and reference key and certs to the files created in the folder-->
https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/

<!--Install dependencies packages-->
npm install
```
### 3. Set environment variables
```html
<!--Create a .env file-->
<!--Set env variables-->
REFRESHTOKEN = '<your-refresh-token>'
CLIENTID = '<your-client-id>'
CLIENTSECRET = '<your-client-secret>'

```

### 4. Run Code
```
node index.js
```

You can use Postman to make requests to the local server. Below is an example of a message body that can be use to send messages. <br>Note:</br> Make sure you know your locationUid and have a valida phone number.
```json
{
     "channel": {
          "identifier": "8001119232",
          "type": "phone"
     },
     "body": "Just a reminder that your appointment is today! - Dynamic Body",
     "locationUid": "b405e23a-2d8e-5000-909c-d1759dd40000"
}
```