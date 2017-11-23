function Friends() {
    this.users = [{
        name: "Dude",
        photo: 'www.google.com',
        scores: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    },
    {
        name: 'Bro',
        photo: 'www.spacex.com',
        scores: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1]
    },
    {
        name: 'Guy',
        photo: 'www.tesla.com',
        scores: [2, 1, 5, 4, 3, 2, 1, 4, 3, 2]
    },
    {
        name: 'Person',
        photo: 'www.stackoverflow.com',
        scores: [2, 2, 3, 3, 4, 4, 2, 2, 1, 4]
    }];
}

Friends.prototype.addFriend = function(data) {
    this.users.push({
        name: data.name,
        photo: data.photo,
        scores: data.scores
    });
}

Friends.prototype.getFriends = function() {
    return this.users;
}

Friends.prototype.getBestMatch = function(data) {
    var matchScore = 0;
    for (var i = 0; i < this.users.length; i++) {
        for (var j = 0; j < this.users[i].scores.length; j++) {
            matchScore += Math.abs(data.scores[j] - this.users[i].scores[j]);
        }
        this.users[i].matchScore = matchScore;
        this.users[i].matchPercent = ((4000 - (matchScore * 100)) / 40);
        matchScore = 0;
    }
    return sortUsers(this.users);
}

function sortUsers(users) {
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < users.length - 1; j++) {
            if (users[j].matchScore > users[j + 1].matchScore) {
                var temp = users[j + 1];
                users[j + 1] = users[j];
                users[j] = temp;
            }
        }
    }
    return users;
}

module.exports = Friends;