# To install the json-server

npm i json-server@0.17.1

# There are some settings in package.json

For mac:
"proxy": "http://localhost:5001", (5000 is already taken by mac) (above the dependencies)

    (bottom of the scripts)
    "server": "json-server --watch db.json --port 5001",
    "dev": "concurrently \"npm run server\" \"npm start\" "

# To run the server

npm run dev
