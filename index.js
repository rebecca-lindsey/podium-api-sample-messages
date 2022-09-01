import 'dotenv/config'
import express, { json, response } from 'express'
import fs from 'fs'
import { createServer } from 'https'
import fetch from 'node-fetch'


const key = fs.readFileSync('./certs/key.pem');
const cert = fs.readFileSync('./certs/cert.pem');
const app = express()
const server = createServer({key: key, cert: cert}, app)

const baseUrl = 'https://api.podium.com/v4/'
const refreshToken = process.env.REFRESHTOKEN
const clientID = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
let token

app.use(express.urlencoded());
app.use(express.json());

//Create a message for a specified location and end user
app.post('/', async (req, res) => {
  try {
    const token = await getTokenID();
    let request;

    if (token) {
        request = await fetch(`${baseUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(req.body)
        })

        const reqResponse = await request.json();
        return res.send(reqResponse)
    } else {
      return(res.send('No authorization token was found.'))
    }
  } catch(error) {
    console.error(error)
    return res.send(error)
  }
})

async function getTokenID() {
  const bodyData = {
    'client_id': clientID,
    'client_secret':clientSecret,
    'grant_type':'refresh_token',
    'refresh_token': refreshToken,
  }

  try {
    const tokenRequest = await fetch('https://accounts.podium.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    })

    const tokenResponse = await tokenRequest.json();

    if(tokenResponse) {
      return tokenResponse.access_token;
    }
  } catch (error) {
    console.error(`Error retrieveing a new token, ${error}`)
    return error
  }
  
}

server.listen(3000, () => {console.log('Server is listening on port 3000')})