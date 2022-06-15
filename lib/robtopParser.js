function parseUserObject(str) {
    const array = str.split(":")

    let data = {}

    for (let i = 0; i < array.length; i += 2) {
        array[i] = Number(array[i])
        switch (array[i]) {
            case 1:
                data.username = array[i + 1]
                break;
            case 2:
                data.userID = Number(array[i + 1])
                break;
            case 3:
                data.stars = Number(array[i + 1])
                break;
            case 4:
                data.demons = Number(array[i + 1])
                break;
            case 6:
                data.ranking = Number(array[i + 1])
                break;
            case 7:
                data.AccountHighlight = Number(array[i + 1])
                break;
            case 8:
                data.creatorpoints = Number(array[i + 1])
                break;
            case 9:
                data.iconID = Number(array[i + 1])
                break;
            case 10:
                data.playerColor = Number(array[i + 1])
                break;
            case 11:
                data.playerColor2 = Number(array[i + 1])
                break;
            case 13:
                data.secretCoins = Number(array[i + 1])
                break;
            case 14:
                data.iconType = Number(array[i + 1])
                break;
            case 15:
                data.special = Number(array[i + 1])
                break;
            case 16:
                data.accountID = Number(array[i + 1])
                break;
            case 17:
                data.usercoins = Number(array[i + 1])
                break;
            case 18:
                data.messageState = Number(array[i + 1])
                break;
            case 19:
                data.sriendsState = Number(array[i + 1])
                break;
            case 20:
                data.youTube = array[i + 1]
                break;
            case 21:
                data.accIcon = Number(array[i + 1])
                break;
            case 22:
                data.accShip = Number(array[i + 1])
                break;
            case 23:
                data.accBall = Number(array[i + 1])
                break;
            case 24:
                data.accBird = Number(array[i + 1])
                break;
            case 25:
                data.accDart = Number(array[i + 1])
                break;
            case 26:
                data.accRobot = Number(array[i + 1])
                break;
            case 27:
                data.accStreak = Number(array[i + 1])
                break;
            case 28:
                data.accGlow = Number(array[i + 1])
                break;
            case 29:
                data.isRegistered = Number(array[i + 1])
                break;
            case 30:
                data.globalRank = Number(array[i + 1])
                break;
            case 31:
                data.friendstate = Number(array[i + 1])
                break;
            case 38:
                data.messages = Number(array[i + 1])
                break;
            case 39:
                data.friendRequests = Number(array[i + 1])
                break;
            case 40:
                data.newFriends = Number(array[i + 1])
                break;
            case 41:
                if (array[i + 1] == 0) { data.NewFriendRequest = false } else { data.NewFriendRequest = true }
                break;
            case 42:
                data.age = array[i + 1]
                break;
            case 43:
                data.accSpider = Number(array[i + 1])
                break;
            case 44:
                data.twitter = array[i + 1]
                break;
            case 45:
                data.twitch = array[i + 1]
                break;
            case 46:
                data.diamonds = Number(array[i + 1])
                break;
            case 48:
                data.accExplosion = Number(array[i + 1])
                break;
            case 49:
                data.modlevel = Number(array[i + 1])
                break;
            case 50:
                data.commentHistoryState = Number(array[i + 1])
                break;
        }
    }
    return data
}

module.exports = parseUserObject