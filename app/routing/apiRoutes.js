const path = require('path');
const friends = require('../data/friends');

module.exports = (app) => {
    app.post("/api/survey", (req, res) => {
        const surveyResult = req.body;

        console.log("surveyResult =================");
        console.log(surveyResult);

        const match = findBestMatch(surveyResult.scores);

        friends.push(surveyResult)

        res.json(match);
    });
}


function findBestMatch(arr) {
    let lowScore;
    let bestMatch;

    for(let friend of friends) {
        let totalDiff = 0;
        
        for(let i = 0; i < arr.length; i++) {
            let diff = arr[i] - friend.scores[i];
            totalDiff += (diff >= 0 ? diff : (diff * -1));
        }

        if(totalDiff < lowScore || lowScore === undefined) {
            lowScore = totalDiff;
            bestMatch = friend;
        }
    }

    return bestMatch;
}