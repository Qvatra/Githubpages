$(document).ready(function() {
    console.log('main: dom ready');

    $('#content').css('display', 'none');
    $('#content').fadeIn(900);

    $('#robo1').hover(function() {
        $('#robo1').addClass('robo1a');
    }, function() {
        $('#robo1').removeClass('robo1a');
    });

    $('#anatomy1').hover(function() {
        $('#anatomy1').addClass('anatomy1b');
    }, function() {
        $('#anatomy1').removeClass('anatomy1b');
    });

    $('#storeBtn').hover(function() {
        $('#storeBtn').addClass('scaleup');
        $('#storeBtn').removeClass('scaledown');
    }, function() {
        $('#storeBtn').addClass('scaledown');
        $('#storeBtn').removeClass('scaleup');
    });

    $('#anatomy1').click(function() {
        var name = 'anatomy1a';
        var obj = this.classList;
        var classArr = [];

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                classArr.push(obj[key]);
            }
        }

        if (classArr.indexOf(name) > -1) {
            $('#anatomy1').removeClass(name);
        } else {
            $('#anatomy1').addClass(name);
        }
    });

    $('.carousel[data-type="multi"] .item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }
    });



});