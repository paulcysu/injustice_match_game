$(document).ready(run_on_load);

var image_array = [];

function run_on_load () {
    randomize(image_front_array);
    add_cards();
    $(".card").addClass("flippable");
    add_event_listener();
    game_played = 0;
    $(".close").click(function() {
        $("#win_modal").addClass("shadow");
    })
    $("#reset").click(function () {
        game_played++;
        reset_stats();
        display_stats();
        $(".card").removeClass("hidden");
        var left_hand = $("#player_left_hand img");
        var right_hand = $("#player_right_hand img");
        left_hand.attr("src", "img/empty_card.png");
        right_hand.attr("src", "img/empty_card.png");
        player_1_health = 3;
        player_2_health = 3;
        $(".left_health").addClass("green");
        $(".right_health").addClass("green")
        $(".card").addClass("flippable");
        turn_index = false;
        $(".card_back").addClass("empty filled");
    });
}



function add_event_listener () {
    $("#game-area").on("click", ".flippable", card_clicked)
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 4;
var match_counter = 0;
var click_disabled = false;
var attempt = 0;
var accuracy = 0;
var turn_index = false;
var player_1_health = 3;
var player_2_health = 3;

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
                // below is code by dan - replace my switch & if conditionals. use array instead//
                var currentPlayerSide = ''
                if(turn_index){
                    //player 2
                    currentPlayerSide = 'right'
                } else {
                    currentPlayerSide = 'left';
                }
                var availableLeftHand = $(".player_"+currentPlayerSide+"_card > .empty");
                var firstAvailableSlot = $(availableLeftHand[0]);
                firstAvailableSlot.removeClass('empty');
                firstAvailableSlot.attr("src", match_image);
                if (turn_index) {
                    matched_battle();
                    }
                turn_index = !turn_index;
                if (player_1_health === 0) {
                        $("#win_modal").removeClass("shadow");
                        $(".winner_text").text("Player 2 Wins!");
                } else if (player_2_health === 0) {
                        $("#win_modal").removeClass("shadow");
                        $(".winner_text").text("Player 1 Wins!");
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

var image_front_array = [
    "img/aquaman.png",
    "img/aquaman.png", 
    "img/green_arrow.jpg",
    "img/green_arrow.jpg",
    "img/mario.jpg",
    "img/mario.jpg",
    "img/flash.png",
    "img/flash.png",
    "img/harley_quinn.png",
    "img/harley_quinn.png",
    "img/joker.png",
    "img/joker.png",
    "img/robin.png",
    "img/robin.png",
    "img/super_girl.png",
    "img/super_girl.png",
    "img/wonder_woman.jpg",
    "img/wonder_woman.jpg",
    "img/batgirl.jpeg",
    "img/batgirl.jpeg"
]

var image_battle_value = {
    "img/mario.jpg": 10,
    "img/aquaman.png": 1,
    "img/green_arrow.jpg": 6,
    "img/flash.png": 8,
    "img/harley_quinn.png": 2,
    "img/joker.png": 5,
    "img/robin.png": 4,
    "img/super_girl.png": 9,
    "img/wonder_woman.jpg": 7,
    "img/batgirl.jpeg": 3,
}

// make object and assign value to each image.

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
            attr: {src: 'img/back_image.jpg'},
            "class": "card_back"
        })
    }
    $(".card").append(card_back);
    $(".back").append(card_back_img);
}

function matched_battle(){
    var available_left_hand = $(".player_left_card > .filled");
    var first_available_left_slot = $(available_left_hand[0]).removeClass("filled");
    var clone_image_left = first_available_left_slot.clone().addClass("animate");
    $("#left_card_1").parent().append(clone_image_left);
    clone_image_left.css("position", "fixed");
    clone_image_left.animate({left: "20%", width: "30%", top:"15%"});
    var available_right_hand = $(".player_right_card > .filled");
    var first_available_right_slot = $(available_right_hand[0]).removeClass("filled");
    var clone_image_right = first_available_right_slot.clone().addClass("animate");
    $("#right_card_1").parent().append(clone_image_right);
    clone_image_right.css("position", "fixed");
    clone_image_right.animate({right: "20%", width: "30%", top: "15%"});
    setTimeout(function() {
        clone_image_right.remove();
        clone_image_left.remove();
    }, 2000)
    for (var image in image_battle_value) {
        if (clone_image_right.attr("src") === image) {
            clone_image_right.attr("value", (image_battle_value[image]));
        } else if (clone_image_left.attr("src") === image) {
            clone_image_left.attr("value", (image_battle_value[image]));
        }
    }
    if (clone_image_right.attr("value") > clone_image_left.attr("value")) {
        clone_image_left.fadeOut();
        player_1_health--;
        var health_box = $("#player_left_health > .green");
        var first_health_box = $(health_box[0]);
        first_health_box.removeClass("green");
    } else {
        clone_image_right.fadeOut();
        player_2_health--;
        // $("#player_right_health div:nth-child(1)").remove();
        var health_box = $("#player_right_health > .green");
        var first_health_box = $(health_box[0]);
        first_health_box.removeClass("green");
    }
}