function Friends() {
    this.users = [{
        name: "Dude",
        photo: 'https://peopledotcom.files.wordpress.com/2017/11/blake-1-small-sq1.jpg?crop=0px%2C0px%2C707px%2C707px&resize=450%2C450',
        scores: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    },
    {
        name: 'Bro',
        photo: 'http://www.illumni.co/wp-content/uploads/2014/10/christian.jpg',
        scores: [5, 4, 3, 2, 1, 5, 4, 3, 2, 1]
    },
    {
        name: 'Guy',
        photo: 'https://static1.squarespace.com/static/5070f2f8c4aa65eb3b6394d0/52fe769ae4b0eb1e35958f16/559c7c30e4b00fd9fdeebf2d/1436318769899/LYB+People+Profile+%2812%29.jpg?format=1000w',
        scores: [2, 1, 5, 4, 3, 2, 1, 4, 3, 2]
    },
    {
        name: 'Person',
        photo: 'https://justinjackson.ca/wp-content/uploads/2008/08/justin-jackson-profile-smile-selfie.jpg',
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