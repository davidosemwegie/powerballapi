# Powerball API - David Osemwegie

The API accepts data for a lottery ticket and responds with wether each pick that user chose won, the prize won per pick and the total of all the prizes won.

## Additions Made:
- Created `draw.js` file
- Created `draw.test.js` files
- Created `/draw` route.

## Installation
This app requires:

- A Linux or MacOS Environment (Windows Untested)
- Node.js LTS 10.9+
- Postman (Can be dowloaded [here](https://www.getpostman.com/))

If you do not have node.js installed: 
  1. [Install NVM](https://github.com/creationix/nvm#installation)
  2. [Install Node 10](https://github.com/creationix/nvm#usage) `nvm install 10.15.3`
  3. [Switch to Node 10](https://github.com/creationix/nvm#usage) `nvm use 10.15.3`

## Running the app

From the checked-out application folder, run:
`npm install`

You should see an output like this:
```
node index.js
App listening on port 3000
```

With **Postman** you can send a request to the following endpoints:

`http://localhost:3000/`

`http://localhost:3000/draw`

## API Documentation

The body of the post request should contain a **Ticket** object that looks like this:
```json
{
  "date": "2019-04-20",
  "picks": [
    "03 27 30 63 65 24", 
    "13 25 56 62 65 01", 
    "62 25 30 65 03 12"
    ]
}
```
***Users can put as many picks as they would like.***

Afer the data has been sent, you should get a response that shows how many matching numbers you got and the prize you won. The object should look like this:
```json
{
    "date": "2019-04-20",
    "multiplier": 3,
    "prizes": [
        {
            "pick_number": 1,
            "matching_numbers": 5,
            "powerball_match": false,
            "prize": 1000000
        },
        {
            "pick_number": 2,
            "matching_numbers": 1,
            "powerball_match": true,
            "prize": 4
        },
        {
            "pick_number": 3,
            "matching_numbers": 3,
            "powerball_match": false,
            "prize": 7
        }
    ],
    "total_prize": 1000011
}
```
### Errors
There are 3 different types of errors that can be gotten.

#### No Powerball draw that date
Status Code: **400**
```json
{
    "error": "Powerball numbers have not been chosen for that date yet"
}
```

#### Invalid date format
*Dates have to have the format 'yyyy-mm-yy'*

Status Code: **405**
```json
{
    "error": "Incorret date format: Please enter a date in the correct format: yyyy-mm-dd"
}
```

#### Invalid pick format
*Each "pick" is a set of 5 integers (from `1`-`69`) along with a 6th integer (the Powerball, from `1`-`26`).*

Status Code: **405**
```json
{
    "error": "Pick 1 is not formatted correctly. Please re-format your picks: '## ## ## ## ## aa'. '##' must be less then 69 and 'aa' must be less then 26."
}
```

The link to the API documentation can be found [here](https://app.swaggerhub.com/apis-docs/David31/powerball/1.0.0-oas3) 

## Testing
To run the written tests, run this:
`npm test`

18 Different tests were ran to make sure all of the individual functions work, so you should see an output like this:
```
Test Suites: 4 passed, 4 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        2.378s
Ran all test suites.
```

## Acknowledgments
Once again, thanks for this opportunity.