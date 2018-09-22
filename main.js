$(document).ready(initialize_game);

var player1;
var player2;
var game;

function initialize_game () {
    game = new Matching_Game();
    game.randomizeCards(game.image_front_array);
    player1 = new Player();
    player2 = new Player();
    game.add_cards();
    $(".card").addClass("flippable");
    game.add_event_listener();
}

class Matching_Game {
    constructor () {
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.click_disabled = false;
        this.turn_index = false;
        this.total_possible_matches = 4;
        this.match_counter = 0;
        this.game_played = 0;
        this.attempt = 0;
        this.accuracy = 0;
        this.player_1_health = 3;
        this.player_2_health = 3;
        this.image_front_array = [
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
        this.image_battle_value = {
            "img/mario.jpg": 9,
            "img/super_girl.png": 8,
            "img/flash.png": 7,
            "img/wonder_woman.jpg": 6,
            "img/green_arrow.jpg": 5,
            "img/joker.png": 4,
            "img/robin.png": 3,
            "img/batgirl.jpeg": 2,
            "img/harley_quinn.png": 1,
            "img/aquaman.png": 0,
        }
        this.random_image_array = [];
    }

    randomizeCards (array) {
        this.random_image_array = [];
        while (array.length > 0) {
            var chosen_random = array.splice(Math.floor(Math.random() * array.length), 1)[0];
            this.random_image_array.push(chosen_random);
        }
    }

    add_cards () {
        for (var x = 0; x < 20; x++) {
            var chosen_img = this.random_image_array.splice(19 - x, 1)[0];
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
                attr: {src: 'img/persona.png'},
                "class": "card_back"
            })
        }
        $(".card").append(card_back);
        $(".back").append(card_back_img);
    }

    add_event_listener () {
        // $("#card_area").on("click", ".flippable", this.card_clicked.bind(this));
        $(".back img").on("click", this.card_clicked.bind(this));
        $(".rules").on("click", function () {
            $("#about_modal").removeClass("shadow");
        })
        $(".close").click(this.closeModal);
        $("#play").click(this.closeModal);
        $(".reset").click(this.reset_button.bind(this));
    }

    closeModal() {
        $("#win_modal").addClass("shadow");
        $("#about_modal").addClass("shadow");
    }

    card_clicked(event) {
        if (this.click_disabled === true) {
            return;
        } else {
            $(event.target.parentElement.parentElement).addClass("hidden");
            if (this.first_card_clicked === null) {
                this.first_card_clicked = $(event.target);
                this.first_card_clicked.removeClass("flippable");
                return this.first_card_clicked;
            } else {
                this.attempt++;
                this.second_card_clicked = $(event.target);
                if ($(this.first_card_clicked).parent().parent().find(".card_front").attr("src") === $(this.second_card_clicked).parent().parent().find(".card_front").attr("src")) {
                    this.first_card_clicked.parent().parent().removeClass("flippable");
                    this.second_card_clicked.parent().parent().removeClass("flippable");
                    this.match_counter++;
                    var match_image = $(this.first_card_clicked).parent().parent().find(".card_front").attr("src");
                    this.first_card_clicked = null;
                    this.second_card_clicked = null;
                    this.run_accuracy();
                    this.display_stats();
                    var currentPlayerSide = '';
                    if(this.turn_index){
                        currentPlayerSide = 'right';
                    } else {
                        currentPlayerSide = 'left';
                    }
                    var availableLeftHand = $('.'+currentPlayerSide+" .empty");
                    var firstAvailableSlot = $(availableLeftHand[0]);
                    firstAvailableSlot.removeClass('empty');
                    firstAvailableSlot.addClass('filled');
                    firstAvailableSlot.attr("src", match_image);
                    if (this.turn_index) {
                        this.matched_battle();
                        }
                    this.turn_index = !this.turn_index;
                    if (this.player_1_health === 0) {
                            $("#win_modal").removeClass("shadow");
                            $(".winner_text").text("Player 2 Wins!");
                    } else if (this.player_2_health === 0) {
                            $("#win_modal").removeClass("shadow");
                            $(".winner_text").text("Player 1 Wins!");
                    } else {
                        return;
                    }
                } else {
                    this.click_disabled = true;
                    this.run_accuracy();
                    this.display_stats();
                    setTimeout(this.flip_back.bind(this), 1000);
                }
            }
        }
    }

    flip_back() {
        $(this.first_card_clicked).parent().parent().removeClass("hidden");
        $(this.second_card_clicked).parent().parent().removeClass("hidden");
        $(this.first_card_clicked).parent().parent().addClass("flippable");
        this.first_card_clicked = null;
        this.second_card_clicked = null;
        this.click_disabled = false;
    }

    matched_battle(){
        var available_left_hand = $(".left .filled");
        var first_available_left_slot = $(available_left_hand[0]).removeClass("filled");
        var clone_image_left = first_available_left_slot.clone().addClass("animate");
        available_left_hand.parent().append(clone_image_left);
        clone_image_left.css("position", "fixed");
        clone_image_left.animate({left: "15%", top: "15%"});
        var available_right_hand = $(".right .filled");
        var first_available_right_slot = $(available_right_hand[0]).removeClass("filled");
        var clone_image_right = first_available_right_slot.clone().addClass("animate");
        available_right_hand.parent().append(clone_image_right);
        clone_image_right.css("position", "fixed");
        clone_image_right.animate({right: "15%", top: "15%"});
        setTimeout(function() {
            clone_image_right.remove();
            clone_image_left.remove();
        }, 2000)
        for (var image in this.image_battle_value) {
            if (clone_image_right.attr("src") === image) {
                clone_image_right.attr("value", (this.image_battle_value[image]));
            } else if (clone_image_left.attr("src") === image) {
                clone_image_left.attr("value", (this.image_battle_value[image]));
            }
        }
        if (clone_image_right.attr("value") > clone_image_left.attr("value")) {
            clone_image_left.fadeOut();
            clone_image_right.animate({right: "33%", top: "15%"});
            available_left_hand.css("opacity", 0.5);
            this.player_1_health--;
            var health_box = $(".left > .health > .green");
            var first_health_box = $(health_box[health_box.length - 1]);
            first_health_box.removeClass("green");
        } else {
            clone_image_right.fadeOut();
            clone_image_left.animate({left: "33%", top: "15%"});
            available_right_hand.css("opacity", 0.5);
            this.player_2_health--;
            var health_box = $(".right > .health > .green");
            var first_health_box = $(health_box[health_box.length - 1]);
            first_health_box.removeClass("green");
        }
    }

    display_stats () {
        var game_played_append = $(".game_played .value").html(this.game_played);
        var attempt_append = $(".attempt .value").html(this.attempt);
        var accuracy_append = $(".accuracy .value").html(this.accuracy);
    }

    run_accuracy () {
        this.accuracy = ((this.match_counter / this.attempt)*100).toFixed(2) + "%";
    }

    reset_stats () {
        this.accuracy = 0;
        this.match_counter = 0;
        this.attempt = 0;
        this.display_stats();
    }

    reset_button () {
        this.game_played++;
        this.player_1_health = 3;
        this.player_2_health = 3;
        this.turn_index = false;
        this.reset_stats();
        this.display_stats();
        $("#card_area").empty();
        this.image_front_array = [
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
        ];
        this.randomizeCards(this.image_front_array);
        this.add_cards();
        var teams = $(".player .team img");
        teams.attr("src", "").addClass("empty");
        $(".card").removeClass("hidden");
        $(".player .health > *").addClass("green");
        $(".card").addClass("flippable");
        $(".back").addClass("empty filled");
    }
}

class Player {
    constructor () {
        this.image = "img/empty_card.png";
        this.health = 3;
    }
    lose_battle () {
        this.health--;
    }
}