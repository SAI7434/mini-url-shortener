# Mini URL Shortener

A basic URL shortener API built using Node.js, Express, and MongoDB.

## Setup Instructions

1. Clone the project

git clone https://github.com/SAI7434/mini-url-shortener.git
cd mini-url-shortener


2. Install dependencies

npm install


3. Create a `.env` file in the root folder with the following content:

PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:3000


4. Start the server

npm run dev


## API Endpoints

### POST /shorten

**Request Body:**

{
  "url": "https://example.com"
}


**Response:**

{
  "shortUrl": "http://localhost:3000/abc123"
}


### GET /:code

Redirects to the original long URL.


#Postman

https://web.postman.co/workspace/My-Workspace~1066f9b7-edbb-4e01-8aa9-89ccb2c3d793/collection/27526595-9173b856-29a4-440f-a9cd-d6058f7b4064?action=share&source=copy-link&creator=27526595 
