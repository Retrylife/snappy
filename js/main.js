team = 5024;
name = "";

//elements
team_name = document.getElementById("name");
winning_string = document.getElementById("iswin");
opr_string = document.getElementById("teamtype");
picker_string = document.getElementById("ispicker");
next_match = document.getElementById("nextmatchid");
last_match_summary = document.getElementById("lastmatchsummary");


// Register client with api
$.get(api_domain + "/auth/devices/register/snappy-" + makeid(8), function (response) {});

function updateTeam(_team) {
    team = _team;
    $.get(api_domain + "/frc/teams/" + team  + "?api-key=" + api_key, function (response) {
        team_name.innerHTML = response.data.nickname;
    });
    update();
}

function update() {
    $.get(api_domain + "/frc/teams/" + team + "/latest?api-key=" + api_key, function (response) {
        console.log(response)
        winning_string.innerHTML = response.wlt_string;
        opr_string.innerHTML = response.opr_string;
        picker_string.innerHTML = response.rank_string;

        if (response.next_match) {
            next_match.innerHTML = response.next_match;
        } else {
            next_match.innerHTML = "N/A"
        }

        if (response.last_match) {
            last_match_summary.innerHTML = "__ <blue>" + response.last_match.blue.score + "</blue> to <red>" + response.last_match.red.score + "</red>";
        } else {
            last_match_summary.innerHTML = team + " has not played any matches";
        }
        
    });
}

updateTeam(5024);
update();