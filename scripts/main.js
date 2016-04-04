$(document).ready(function() {
    console.log('main: dom ready');

    $('#content').css('display', 'none');
    $('#content').fadeIn(900);

    $('.robo1').hover(function() {
        $(this).addClass('robo1a');
    }, function() {
        $(this).removeClass('robo1a');
    });

    $('.soldier').hover(function() {
        $(this).addClass('soldiera');
    }, function() {
        $(this).removeClass('soldiera');
    });

    $('.medic').hover(function() {
        $(this).addClass('medica');
    }, function() {
        $(this).removeClass('medica');
    });     

    $('.anatomy1').hover(function() {
        scaleAnimation($(this), 0.03, 200);
    }, function() {
        scaleAnimation($(this), 0, 250);
    });

    $('#storeBtn').hover(function() {
        scaleAnimation($('#storeBtn'), 0.08, 200, function() {
            scaleAnimation($('#storeBtn'), 0.04, 250);
        });
    }, function() {
        scaleAnimation($('#storeBtn'), 0, 300);
    });

    $('.anatomy1').click(function() {
        var name = 'anatomy1a';
        var obj = this.classList;
        var classArr = [];

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                classArr.push(obj[key]);
            }
        }

        if (classArr.indexOf(name) > -1) {
            $(this).removeClass(name);
        } else {
            $(this).addClass(name);
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
        var el = $(this);
        rotateAnimation(el, 0, -400, 300, function() { 
            rotateAnimation(el, -400, 40, 200);
        });
    }, function() {
        rotateAnimation($(this), 0, 360, 300);
    });

    scrollActivation($('.footer'), window.innerHeight, 200, function(el) {
        scaleAnimation(el, 0.05, 200, function() {
            scaleAnimation(el, 0, 200);
        });
    });


    $('.carousel-col img, .carousel-col div').click(function() {
        $('#myModal .modal-dialog .modal-content .modal-body').html($(this).clone());
        $('#myModal').modal('show');
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

function scaleAnimation(element, scale, duration, callback) {
    $(document).ready(function() {
        if (!element.is(':animated')) {
            element.animate({ scale: scale }, {
                step: function(now, fx) {
                    $(this).css('-webkit-transform', 'scale(' + (1 + now) + ')');
                    $(this).css('-moz-transform', 'scale(' + (1 + now) + ')');
                    $(this).css('transform', 'scale(' + (1 + now) + ')');
                },
                duration: duration ? duration : 200,
                easing: 'swing',
                complete: function() {
                    if (callback && typeof callback() === "function") callback();
                }
            });
        }
    });
}

function rotateAnimation(element, startAngle, angle, duration, callback) {
    $(document).ready(function() {
        if (!element.is(':animated')) {
            element.animate({ borderSpacing: angle }, {
                step: function(now, fx) {
                    $(this).css('-webkit-transform', 'rotate(' + (startAngle + now) + 'deg)');
                    $(this).css('-moz-transform', 'rotate(' + (startAngle + now) + 'deg)');
                    $(this).css('transform', 'rotate(' + (startAngle + now) + 'deg)');
                },
                duration: duration ? duration : 200,
                easing: 'swing',
                complete: function() {
                    element.css({ borderSpacing: 0 });
                    if (callback && typeof callback() === "function") callback();
                }
            });
        }
    });
}