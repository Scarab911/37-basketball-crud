class Basketball {
    constructor(gameName, playersInTeam) {
        this.gameName = gameName;
        this.playerNumber = playersInTeam;

        this.playersList = [];
        this.teamList = [];
        this.teamID = 0;
        this.playerID = 0;

        this.playing = [0, 0];
        this.gamesPlayedTotal = 0;
    }
    wannaBePlayer(playerName, price) {
        this.playersList.push({ player: playerName, price, id: ++this.playerID })
    }

    createTeam(teamName) {

        this.teamList.push({ teamName, teamId: ++this.teamID, players: [], winsCount: 0 })
        console.log(`A "${teamName}" just entered a game!`);
    }

    buyPlayer(teamID, playerID) {
        let team = this.teamList[teamID - 1];
        let allPlayers = this.playersList;

        for (const player of team.players) {
            if (player.id === playerID) {
                console.error(`"${team.teamName}" team can't add the same player twice!`);
                return false
            }
        }


        if (team.players.length === this.playerNumber) {
            console.error(`"${team.teamName}" team can't add extra players to it's team.\nMaximum players per team is 3.`);
            return false
        }

        for (const player of allPlayers) {
            if (player.id === playerID) {
                team.players.push(player)
                console.log(`"${team.teamName}" team just acquired new player ${player.player} for ${player.price} cash/year!`);
                break;
            }
        }

    }

    teamValue(teamID) {
        let count = 0
        let team = this.teamList[teamID - 1];

        for (const player of team.players) {
            count += player.price;
        }
        console.log(`"${team.teamName}" team is paying ${count} cash/year for it's players.`);
    }

    letsPlay(firstTeamID, secondTeamId) {

        console.log(`New game everybody!\n"${this.teamList[firstTeamID - 1].teamName}" vs. "${this.teamList[secondTeamId - 1].teamName}"`);

        this.gamesPlayedTotal++;

        return this.playing = [firstTeamID, secondTeamId];
    }

    score(firstTeamScore, secondTeamScore) {

        let teamIndex = 0;

        if (firstTeamScore > secondTeamScore) {
            teamIndex = this.playing[0] - 1;
        } else {
            teamIndex = this.playing[1] - 1;
        }
        const team = this.teamList[teamIndex];
        team.winsCount++
        console.log(`${team.teamName}" wins!`);
    }

    seasonSummary() {
        console.log(`Season summary for "${this.gameName}" 3x3 league:`);
        console.log(`####################`);
        console.log(`Total games played: ${this.gamesPlayedTotal}`);

        let maxWins = 0;
        let winnerTeam = '';

        for (const team of this.teamList) {
            if (team.winsCount > maxWins) {
                maxWins = team.winsCount;
                winnerTeam = team.teamName;
            }
        }

        console.log(`Winner team: "${winnerTeam} "`);
        console.log(`####################`);
    }
}

module.exports = Basketball;