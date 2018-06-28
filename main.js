$(document).ready(run_on_load);

var image_array = [];

function run_on_load () {
    randomize(image_front_array);
    add_cards();
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
var turn_index = false;

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
                var match_image = $(first_card_clicked).find(".card_front").attr("src");
                first_card_clicked = null;
                second_card_clicked = null;
                run_accuracy();
                display_stats();
                if(turn_index === false) {
                    turn_index = true;
                    var player_left_hand_1 = $("#left_card_1");
                    var player_left_hand_2 = $("#left_card_2");
                    var player_left_hand_3 = $("#left_card_3");
                    var player_left_hand_4 = $("#left_card_4");
                    var player_left_hand_5 = $("#left_card_5");
                    // if (player_left_hand_1.attr("src") === "img/empty_card.png") {
                    //     player_left_hand_1.attr("src", match_image);
                    // } else if (player_left_hand_2.attr("src") === "img/empty_card.png") {
                    //     player_right_hand_1.attr("src", match_image);
                    // }
                    switch ("img/empty_card.png") {
                        case player_left_hand_1.attr("src"):
                            player_left_hand_1.attr("src", match_image);
                            break;
                        case player_left_hand_2.attr("src"):
                            player_left_hand_2.attr("src", match_image);   
                            break;
                        case player_left_hand_3.attr("src"):
                            player_left_hand_3.attr("src", match_image);   
                            break;
                        case player_left_hand_4.attr("src"):
                            player_left_hand_4.attr("src", match_image);   
                            break;
                        case player_left_hand_5.attr("src"):
                            player_left_hand_5.attr("src", match_image);   
                            break;
                    }
                } else {
                    turn_index = false;
                    var player_right_hand_1 = $("#right_card_1");
                    var player_right_hand_2 = $("#right_card_2");
                    var player_right_hand_3 = $("#right_card_3");
                    var player_right_hand_4 = $("#right_card_4");
                    var player_right_hand_5 = $("#right_card_5");
                    // if (player_right_hand_1.attr("src") === "img/empty_card.png") {
                    //     player_right_hand_1.attr("src", match_image);
                    // }
                    switch ("img/empty_card.png") {
                        case player_right_hand_1.attr("src"):
                            player_right_hand_1.attr("src", match_image);
                            break;
                        case player_right_hand_2.attr("src"):
                            player_right_hand_2.attr("src", match_image);
                            break; 
                        case player_right_hand_3.attr("src"):
                            player_right_hand_3.attr("src", match_image);
                            break;
                        case player_right_hand_4.attr("src"):
                            player_right_hand_4.attr("src", match_image);
                            break;
                        case player_right_hand_5.attr("src"):
                            player_right_hand_5.attr("src", match_image);
                            break;   
                    }
                }
                if (match_counter === total_possible_matches) {
                    alert("!!!!BATTLE!!!!");
                    // how to add value to images?
                    if(player_left_hand_1.attr("value") > player_right_hand_1.attr("value")) {
                        $("#player_left_health").backgroundColor("white");
                    }
                } else {
                    return;
                }
            } else {
                click_disabled = true;
                run_accuracy();
                display_stats();
                setTimeout(flip_back, 1000);
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

{/* <div class="card">
    <div class="front">
        <img class="card_front" src="img/red_anti_air.jpg">
    </div>
    <div class="back">
        <img class="card_back" src="img/recruit_image.jpg">
    </div>
</div> */}

var image_front_array = [
    "img/charizard.png",
    "img/charizard.png", 
    "img/mewtwo.png", 
    "img/mewtwo.png",
    "img/agumon.jpg",
    "img/agumon.jpg",
    "img/jigglypuff.png",
    "img/jigglypuff.png",
    "img/pikachu.png",
    "img/pikachu.png",
    "img/blastoise.gif",
    "img/blastoise.gif",
    "img/snorlax.png",
    "img/snorlax.png",
    "img/meowth.png",
    "img/meowth.png",
    "img/bulbasaur.png",
    "img/bulbasaur.png",
    "img/squirtle.jpg",
    "img/squirtle.jpg"
]

var random_image_array = [];

function randomize (array) {
    while (array.length > 0) {
        var chosen_random = array.splice(Math.floor(Math.random() * array.length), 1)[0];
        random_image_array.push(chosen_random);
    }
}

function add_cards () {
    for (var x = 0; x < 20; x++) {
        var chosen_img = random_image_array.splice(19 - x, 1)[0];
        console.log(chosen_img);
        var card_container = $("<div>", {
            "class": "card"
        });
        var card_front = $("<div>", {
            "class": "front"
        });
        $("#card_area").append(card_container);
        var card_front_img = $("<img>", {
            attr: {src: chosen_img},
            "class": "card_front"
        });
        card_container.append(card_front);
        card_front.append(card_front_img);
        var card_back = $("<div>", {
            "class": "back",
        });
        var card_back_img = $("<img>", {
            attr: {src: 'img/pokeball.png'},
            "class": "card_back"
        })
    }
    $(".card").append(card_back);
    $(".back").append(card_back_img);
}