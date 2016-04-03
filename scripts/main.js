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

        for (var i = 0; i < 1; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });

    $('.social').hover(function() {
        $(this).animate({ borderSpacing: -360 }, {
            step: function(now, fx) {
                $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                $(this).css('transform', 'rotate(' + now + 'deg)');
            },
            duration: 300
        }, 'linear');
    }, function() { });

    scrollActivation($('.footer'), window.innerHeight, 200, function(el) {
        scaleAnimation(el, 1.05, 200, 'linear', function() {
            scaleAnimation(el, 1, 200, 'linear');
        });
    });

});




// activates callback for the given element if downscroll reaches 'activationHeight + element.position'
function scrollActivation(element, activationHeight, deactivationHeight, callback) {
    $(document).ready(function() {
        var lastScrollTop = 0;
        var allowActivation = true;
        $(window).scroll(function(evt) {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > lastScrollTop) { // downscroll
                if (scrollTop + activationHeight >= element.offset().top && allowActivation) {
                    //console.log('activate');
                    allowActivation = false;
                    callback(element);
                }
            } else { // upscroll
                if (!allowActivation && scrollTop + activationHeight + deactivationHeight < element.offset().top) {
                    //console.log('allow activation');
                    allowActivation = true;
                }
            }
            lastScrollTop = scrollTop;
        });
    });
}

function scaleAnimation(element, scale, duration, easing, callback) {
    $(document).ready(function() {
        element.animate({ scale: scale }, {
            step: function(now, fx) {
                $(this).css('-webkit-transform', 'scale(' + now + ')');
                $(this).css('-moz-transform', 'scale(' + now + ')');
                $(this).css('transform', 'scale(' + now + ')');
            },
            duration: duration ? duration : 200,
            complete: function() {
                if (callback && typeof callback() === "function") callback();
            }
        }, easing ? easing : 'linear');
    });
}