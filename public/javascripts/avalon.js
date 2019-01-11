
document.addEventListener('DOMContentLoaded', onLoad, false)

var user_id;
var socket = io('http://' + window.document.location.host);

//game components
/*

Objective:
    2 hidden teams
    - Allies of 'Arthur'
    - Mates of 'Mordrid'

    5 quests total
    Allies win by completing 3 quests.
    Mates win if 3 quests end in failure or they assassinate mordrid

Characters & Tokens:
    CHARACTERS:
    Characters cannot be revealed at any point.
    They are blue for allies, red for mates. 

    There are a few special characters that are optionally added.
    Merlin and Assassin are in all games.

    TOKENS:
    LEADER - designates the player that will propose the quest team
    TEAM - Allocate positions on the quest team
    VOTE - Approve or reject the leader's proposed Quest team
    QUEST - Determine a quests success or failure
    
Setup:
    Tableau(gameboard) visible to all players.
    Number of players determines team size:
        Players: 5 6 7 8 9 10
        Allies:  3 4 4 5 6 6
        Mates:   2 2 3 3 3 4 

    Once at least 5 players and at most 10 players have joined
    and the settings have been chosen, choose the appropriate
    amount of ally and mate characters. Bad must have at least
    the assassin character and good must have at least merlin 
    character, regular allies and mates are just loyal sallies 
    or mini-mates respectively.
    
    Each player is randomly assigned a character, which they 
    can view but no one else.

    Mates are then allowed to see who the other mates are, 
    and merlin also gets to see the mates.

GamePlay:
    The game consists of several rounds where each round has
    a team building phase and then a quest phase.

    Team Building phase:
        A LEADER is assigned to a player, who then chooses 
        an amount of players to be on a team. The leader
        chooses the team by assigning TEAM tokens to 
        other players. The amount of players is determined
        by the total amount of players and the round
    
        Players    5 6 7 8 9 10
        1st Quest  2 2 2 3 3 3
        2nd Quest  3 3 3 4 4 4 
        3rd Quest  2 4 3 4 4 4
        4th Quest  3 3 4 5 5 5
        5th Quest  3 4 4 5 5 5

        - A player can only be given one TEAM token
        - A Leader can select themselves
        
        Team Vote
            Leader proposes the team, then the entire group 
            votes whether to accept it or not. Votes are 
            public as they are important to where players
            loyalty lies. Ties are fails

        If the vote fails, restart this phase.

        If the vote fails 5 times in one round, the evil team wins

    Quest Phase:
        Each player on the quest gets a set of Quest Cards to choose
        from (success or fail). Once the players have chosen their cards, 
        the quest is deemed a failure if any of the cards are fail, 
        and passes only if all the cards are success cards

        - The good players must select the success card. The bad player
          may select either a fail or a success card.

        - The 4th quest (4th round) in games of 7 or more requires
        at least two fail cards to be a failed quest
    
    For Every round/quest, the result of the quest is displayed on the 
    tableau.


End of the game
    Allies win if they win 3 quests without revealing who merlin is

    Mates win when three quests end in failure, the assassin figures
    out who merlin is, or 5 teams get rejected in the same round.

    The game ends after 3 successful quests or 3 failed quests.
    

*/

/* 
    App Logic

    Join
        user creates username. then they can 
        either create a game or join an 
        existing game.

        User can create a game. This is
        its own socket on the server. The game
        is then given an id that can be used 
        by players to join the lobby of the
        game.

        The user that started the lobby is 
        the owner. Only they can adjust the 
        game settings.

        maximum of 10 players in a game

        (The order of players is important as 
        it represents the players sitting in
        order around a table.)

    Setup
        Once there are at least 5 players in 
        the lobby, the owner can:
            - select optional special characters (optional)
            - kick players(optional)
            - adjust the round conditions(optional)
            - *Start the game*

    Reveal
        Users are assigned characters, and are shown their character card 
        and a description of who they are.
        Users that are mates are shown to one another via their usernames.
        Whichever User is merlin is shown who the mates are via their usernames.

    Rounds(x5)
        Team Building and Vote
            A leader is assigned (needs to loop through users in order)
            The leader selects the users to be on the quest
            Once the leader submits the team, all the users can vote
            for or against the team.
            If it fails (or tie), repeat Team Building (not new round)
                If 5 fails, mates win. go to endgame
            If it wins, continue to quest
        Quest
            Players on quest select success or fail
                - allies have to select success
                - mates can choose success or fail
            Show cards (no user association)
            If there is one fail card, quest fails
            otherwise the success is a pass
        If 3 quests passed, allies win go to endgame
        If 3 quests failed, mates win go to endgame
        
    End
        If Allies win:
            Assassin can guess who merlin is
        If Mates win they just win.
*/

socket.on('avalon', (data) => {
    switch(data.r_code) {
        /*
        Joining the avalon server
        - make a user name
        - Join or make a new game
            - if making a new game send request to server
              to create a new socket at the game id and 
              send the socket name back
            - joining a game with an id, send the request
              to join an existing game to the server, which
              will either let you join if the game is not full
              and the game id exists
              if the join fails, restart this process
        */
        case 0:
            // make user successful
            // make or join a game
            break;
        case 1:
            // make user failed
            // make new user
            break;
        default:
            break;
    }
});

function makeGame(){
    // prompt to join or make a new game
    // make a new game is selected

    // join a new game is selected and the game id field is filled
    
}

function joinGame(game_id, callback){
    socket.on(game_id, callback);
};


function onLoad(){

}