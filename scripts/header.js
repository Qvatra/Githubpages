$(document).ready(function() {
    console.log('header: dom ready');

    $('#content').css('display', 'none');
    $('#content').fadeIn(900);

    $('#header').load("header.html", function() {
        // list of all pages that used in navbar
        var pages = ['home', 'contact', 'sprites'];
        var currentPage = pages.filter(function(page) {
            return window.location.pathname.indexOf(page) > -1;
        })[0];
        // set active btn according to location
        if (currentPage) {
            $('#nav-' + currentPage).addClass('active');
        } else {
            $('#nav-home').addClass('active');
        }
    });
    $('#footer').load("footer.html");

    //$('body').fadeOut(2000);




});