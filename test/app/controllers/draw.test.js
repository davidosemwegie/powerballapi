const {
    determine_prize,
    check_picks,
    check_powerball_number,
    check_date_format,
    check_pick_format,
    get_powerball_data } = require('../../../app/controllers/draw')

const ticket = {
    date: "2019-04-20",
    picks: ["03 27 30 63 65 24", "13 25 56 62 65 01", "62 25 30 65 03 12"]
}

const ticket_ivalid_date_format = {
    date: "22-4-2019",
    picks: ["03 27 30 63 65 46", "13 25 56 62 65 01", "62 25 30 65 03 12"]
}

const ticket_invalid_pick_format = {
    date: "2019-04-20",
    picks: ["03 27 30 63 65 46", "13 25 56 62 65 01", "62 25 30 65 03 12"]
}

const pball = {
    draw_date: "2019-04-20T00:00:00.000",
    multiplier: "3",
    winning_numbers: "03 27 30 63 65 01"
}

/* test for determine_prize() function */

test('prize should be 4 for 1 matching number and powerball numbers match ', () => {
    expect(determine_prize(1, true)).toEqual(4)
})

test('prize should be 1000000 for 5 matching number and no powerball numbers match ', () => {
    expect(determine_prize(5, false)).toEqual(1000000)
})

test('prize should be 50000 for 4 matching number and powerball numbers match ', () => {
    expect(determine_prize(4, true)).toEqual(50000)
})

/* test for check_picks() function */
test(`Should have 5 matching numbers`, () => {
    const userPicks = ticket.picks[0].split(" ")
    const winningPicks = pball.winning_numbers.split(" ")
    expect(check_picks(winningPicks, userPicks)).toEqual(5)
})

test(`Should have 1 matching number`, () => {
    const userPicks = ticket.picks[1].split(" ")
    const winningPicks = pball.winning_numbers.split(" ")
    expect(check_picks(winningPicks, userPicks)).toEqual(1)
})

test(`Should have 3 matching numbers`, () => {
    const userPicks = ticket.picks[2].split(" ")
    const winningPicks = pball.winning_numbers.split(" ")
    expect(check_picks(winningPicks, userPicks)).toEqual(3)
})

/* test for check_powerball_number() function */
test('should return false because powerball numbers do not match', () => {
    const userPicks = ticket.picks[0].split(" ")
    const winningPicks = pball.winning_numbers.split(" ")
    expect(check_powerball_number(winningPicks[5], userPicks[5])).toBeFalsy()
})

test('should return true because powerball numbers do not match', () => {
    const userPicks = ticket.picks[1].split(" ")
    const winningPicks = pball.winning_numbers.split(" ")
    expect(check_powerball_number(winningPicks[5], userPicks[5])).toBeTruthy()
})

/* test for check_date_format() function */
test('Correct Date format', () => {
    expect(check_date_format(ticket.date)).toBeTruthy();
})

test('Incorrect Date format', () => {
    expect(check_date_format(ticket_ivalid_date_format.date)).toBeFalsy();
})

/* test for check_pick_format() function */
test("Correct picks format", () => {
    expect(check_pick_format(ticket.picks[2])).toBeTruthy()
})

test("Incorrect picks format", () => {
    expect(check_pick_format(ticket_invalid_pick_format.picks[0])).toBeFalsy()
})

/* test for get_powerball_data() function */
test("Retriving correct powerball data", () => {

    const request = require('request');

    const url = 'https://data.ny.gov/resource/d6yy-54nr.json'

    request(url, { json: true }, (err, result, body) => {
        if (err) {
            return console.log(err);
        }
        expect(get_powerball_data(body, ticket.date)).toEqual({
            draw_date: "2019-04-20T00:00:00.000",
            multiplier: "3",
            winning_numbers: "03 27 30 63 65 01"
        })
    })
})
