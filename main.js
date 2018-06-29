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
                // if (turn_index) {
                //     matched_battle();
                //     }
                turn_index = !turn_index;
                // above code by dan //
                if (match_counter === total_possible_matches) {
                    alert("!!!!BATTLE!!!!");
                    matched_battle();
                    if (player_1_health === 0) {
                        alert("!!!!Player 2 Wins!!!!")
                    } else if (player_2_health === 0) {
                        alert("!!!Player 1 Wins!!!!")
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
    var available_left_hand = $(".player_left_card > .filled").removeClass("filled");
    var first_available_left_slot = $(available_left_hand[0]);
    var clone_image_left = first_available_left_slot.clone().addClass("animate");
    $("#left_card_1").parent().append(clone_image_left);
    clone_image_left.css("position", "fixed");
    clone_image_left.animate({left: "20%", height: "100%"});
    var available_right_hand = $(".player_right_card > .filled").removeClass("filled");
    var first_available_right_slot = $(available_right_hand[0]);
    var clone_image_right = first_available_right_slot.clone().addClass("animate");
    $("#right_card_1").parent().append(clone_image_right);
    clone_image_right.css("position", "fixed");
    clone_image_right.animate({right: "20%", height: "100%"});
    clone_image_right.fadeOut();
    
    //select the 1st available hand image on the player left side
    //select the 1st available hand image on the player right side
    //clone both images, put them in exactly the same spot as the origin.  the clones should have position fixed.  
        //use .position to get the left/top for each image.  use that to position the copied images
    //animate both images to move towards center and get larger
        //.animate({ left: 30%, height: 200%})

    //put on an overlay dark area over the entire background
    //add on versus graphic between both pokemon
    //play fight animation
    //whiever pokemon dies, have it fade to 0 opacity
    //make background and winner disappear
    //change dead pokemon to skull icon
}