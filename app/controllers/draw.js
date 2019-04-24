/* David Osemwegie Monday April 22nd */

//Request is going to be used for the retrival of JSON data from a url via a http request.
const request = require('request');

//Draw function called on '/draw'
function draw(req, res) {

    const url = 'https://data.ny.gov/resource/d6yy-54nr.json'

    //Creating tikcet objecy
    const ticket = {
        date: req.body.date,
        picks: req.body.picks
    }

    //Check to see if the date has been formatted accurately
    if (check_date_format(ticket.date) == false) {
        res.status(405).send({
            error: "Incorret date format: Please enter a date in the correct format: yyyy-mm-dd"
        })
    } else {

        //Making request to url for Power Ball Datat
        request(url, { json: true }, (err, result, body) => {
            if (err) {
                return console.log(err);
            }

            const pData = get_powerball_data(body, ticket.date)

            if (pData == false) {
                res.status(400).send({
                    error: "Powerball numbers have not been chosen for that date yet"
                })
            } else {
                var multiplier = parseInt(pData.multiplier)
                winningNumbers = pData.winning_numbers.split(" ") //dividing the winning numbers string into an array
                powerballNumber = winningNumbers[5] //storing the last digit of winning number array as powerball number

                //initializing varibale that is going to store all the total prize value
                var totalPrize = 0

                //initializing varibale that will store the prize for each pick 
                var picks = []

                //initializing variable that will stores in indivi
                var picksObj = []

                //Looping through pick that the user gave
                for (var i = 0; i < ticket.picks.length; i++) {

                    if (check_pick_format(ticket.picks[i]) == false) {
                        res.status(405).json({
                            error: `Pick ${i + 1} is not formatted correctly. Please re-format your picks: '## ## ## ## ## aa'. '##' must be less then 69 and 'aa' must be less then 26.`,
                        })
                        return
                        // picksObj = {
                        //     pick_number: i + 1,
                        //     error: `Pick ${i + 1} is not formatted correctly.`,
                        //     message: "Please re-format your picks: '## ## ## ## ## aa'. '##' must be less then 69 and 'aa' must be less then 26."
                        // }
                    } else {
                        var userPicks = ticket.picks[i].split(" ")
                        var matchingNumbers = check_picks(winningNumbers, userPicks)
                        var powerballMatch = check_powerball_number(winningNumbers[5], userPicks[5])

                        var prize = determine_prize(matchingNumbers, powerballMatch)

                        picksObj = {
                            pick_number: i + 1,
                            matching_numbers: matchingNumbers,
                            powerball_match: powerballMatch,
                            prize: prize
                        }

                        totalPrize += prize //increming the total prize varibale by the current prize value
                    }

                    picks.push(picksObj) //Add the new picks object to the picks array

                }

                //initializing json object that is going to be returned back to the user
                var response = {
                    date: ticket.date,
                    multiplier: multiplier,
                    prizes: picks,
                    total_prize: totalPrize
                }

                res.status(200).json(response)

            }

        });
    }
}

/* determine_prize() function is going to calculate the prize that the person wins
based on the number of matching numbers that they got and based on if the powerball 
number matches */
function determine_prize(matchingNumbers, powerballMatch) {
    var prize = 0

    switch (matchingNumbers) {
        case 0:
            if (powerballMatch == true) {
                prize = 4
            } else {
                prize = 0
            }
            break
        case 1:
            if (powerballMatch == true) {
                prize = 4
            } else {
                prize = 0
            }
            break
        case 2:
            if (powerballMatch == true) {
                prize = 7
            } else {
                prize = 0
            }
            break
        case 3:
            if (powerballMatch == true) {
                prize = 100
            } else {
                prize = 7
            }
            break
        case 4:
            if (powerballMatch == true) {
                prize = 50000
            } else {
                prize = 100
            }
            break
        case 5:
            if (powerballMatch == true) {
                prize = 99999999999
            } else {
                prize = 1000000
            }
            break
    }

    return prize
}

/* check_picks() is compares the regular numbers that the user picks to the winning numbers for that day */
function check_picks(correctPicks, userNumbers) {

    var matchingNumbers = 0 //Matching number counter

    //Looping through to 5 because the powerball number is not included.
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (userNumbers[i] === correctPicks[j]) {
                //If numbers match then increase matching numbers by 1
                matchingNumbers += 1
            }
        }
    }
    return (matchingNumbers)
}

/* check_powerball_number() compares the winning powerball number to the user's powerball number */
function check_powerball_number(correctNumber, UserNumber) {
    if (correctNumber === UserNumber) {
        return true
    } else {
        return false
    }
}

/* check_date_format() checks and makes sure that the date is formatted properly with regular expressions*/
function check_date_format(date) {
    //Regular Expression for date format
    const r = /\d{4}-\d{2}-\d{2}$/
    return r.test(date)
}

/* check_pick_format() checks and makes sure that the number picks that the user
inputs are formatted properly with regular expressions */
function check_pick_format(pick) {
    const r = /[0-6][0-9] [0-6][0-9] [0-6][0-9] [0-6][0-9] [0-6][0-9] [0-2][0-6]$/
    return r.test(pick)
}

/* get_powerball_data() get the winning numbers and the multiplier for the specified date  */
function get_powerball_data(array, date) {
    for (var i = 0; i < array.length; i++) {
        if (array[i]['draw_date'].includes(date)) {
            return array[i]
        }
    }
    return false
}

module.exports = {
    draw,
    determine_prize,
    check_picks,
    check_powerball_number,
    check_date_format,
    check_pick_format,
    get_powerball_data
}