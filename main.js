$(document).ready(run_on_load);

function run_on_load () {
    add_event_listener();
}

function add_event_listener () {
    $(".card").click(card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 10;
var match_counter = 0;
var click_disabled = false;

function card_clicked() {
    if (click_disabled === true) {
        return;
    } else {
        $(this).addClass("hidden");
        if (first_card_clicked === null) {
            first_card_clicked = $(this);
            first_card_clicked.off("click");
            return first_card_clicked;
        } else {
            $(".card").off('click');
            second_card_clicked = $(this);
            if ($(first_card_clicked).find(".card_front").attr("src") === $(second_card_clicked).find(".card_front").attr("src")) {
                match_counter++;
                first_card_clicked = null;
                second_card_clicked = null;
                if (match_counter === total_possible_matches) {
                    alert("You WON!");
                } else {
                    $(".card").on("click", card_clicked);
                    return;
                }
            } else {
                click_disabled = true;
                setTimeout(flip_back, 2000) // what to google for?
            }
        }
    }
}

function flip_back() {
    $(first_card_clicked).removeClass("hidden");
    $(second_card_clicked).removeClass("hidden");
    first_card_clicked = null;
    second_card_clicked = null;
    $(".card").on("click", card_clicked);
    click_disabled = false;
}
