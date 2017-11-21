function Friends() {
    this.users = [];
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

Friends.prototype.getBestMatch = function() {
    return this.users[0];
}

module.exports = Friends;