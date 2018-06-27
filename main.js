$(document).ready(run_on_load);

function run_on_load () {
    $(".card").addClass("flippable");
    add_event_listener();
    game_played = 0;
    $("#reset").click(function () {
        game_played++;
        reset_stats();
        display_stats();
        $(".card").removeClass("hidden");
    });
}

function add_event_listener () {
    $("#game-area").on("click", ".flippable", card_clicked)
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 10;
var match_counter = 0;
var click_disabled = false;
var attempt = 0;
var accuracy = 0;

function card_clicked() {
    if (click_disabled === true) {
        return;
    } else {
        $(this).addClass("hidden");
        if (first_card_clicked === null) {
            first_card_clicked = $(this);
            first_card_clicked.removeClass("flippable");
            return first_card_clicked;
        } else {
            attempt++;
            second_card_clicked = $(this);
            if ($(first_card_clicked).find(".card_front").attr("src") === $(second_card_clicked).find(".card_front").attr("src")) {
                second_card_clicked.removeClass("flippable");
                match_counter++;
                first_card_clicked = null;
                second_card_clicked = null;
                run_accuracy();
                display_stats();
                if (match_counter === total_possible_matches) {
                    alert("You WON!");
                } else {
                    return;
                }
            } else {
                click_disabled = true;
                run_accuracy();
                display_stats();
                setTimeout(flip_back, 2000);
            }
        }
    }
}

function flip_back() {
    $(first_card_clicked).removeClass("hidden");
    $(second_card_clicked).removeClass("hidden");
    $(first_card_clicked).addClass("flippable");
    first_card_clicked = null;
    second_card_clicked = null;
    click_disabled = false;
}

function reset_stats () {
    accuracy = 0;
    match_counter = 0;
    attempt = 0;
    display_stats();
};

function display_stats () {
    var game_played_append = $(".game_played .value").html(game_played);
    var attempt_append = $(".attempt .value").html(attempt);
    var accuracy_append = $(".accuracy .value").html(accuracy);
}

function run_accuracy () {
    accuracy = ((match_counter / attempt)*100).toFixed(2) + "%";
}