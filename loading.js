$(document).ready(initializeApplication);

function initializeApplication() {
    closeLoader();
}

function closeLoader() {
    let loader = $('.loader');

    function addFade() {
        loader.addClass('fade');
    }

    function addDisplayNone() {
        loader.addClass('none')
    }

    setTimeout(addFade, 60);
    setTimeout(addDisplayNone, 1000)
}