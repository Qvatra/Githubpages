$(document).ready(function() {
    animateAll(['robo1','soldier','medic','girlw','girld']);
    //appearScaleAll(['fa-film', 'fa-cogs', 'glyphicon-time', 'fa-code', 'fa-globe'], 0.15);

    appearScaleAll(['btn-success'], 0.08);

    //hovering activates bouncing scale effect ------------------
    $('#storeBtn').hover(function() {
        scaleAnimation($('#storeBtn'), 0.08, 200, function() {
            scaleAnimation($('#storeBtn'), 0.04, 250);
        });
    }, function() {
        scaleAnimation($('#storeBtn'), 0, 300);
    });
    // -----------------------------------------------------------
    //hovering textures activates animation ----------------------  
    $('.girld-textures').hover(function() {
        $('.girld').addClass('girlda');
        $(".girld-textures").removeAttr("title");
    }, function() {
        $('.girld').removeClass('girlda');
    });

    $('.girlw-textures').hover(function() {
        $('.girlw').addClass('girlwa');
        $(".girlw-textures").removeAttr("title");
    }, function() {
        $('.girlw').removeClass('girlwa');
    });

    $('.soldier-textures').hover(function() {
        $('.soldier').addClass('soldiera');
        $('.medic').addClass('medica');
        $(".soldier-textures").removeAttr("title");
    }, function() {
        $('.soldier').removeClass('soldiera');
        $('.medic').removeClass('medica');
    });    
    // -----------------------------------------------------------

    // $('.anatomy1').click(function() {
    //     var name = 'anatomy1a';
    //     var obj = this.classList;
    //     var classArr = [];

    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             classArr.push(obj[key]);
    //         }
    //     }

    //     if (classArr.indexOf(name) > -1) {
    //         $(this).removeClass(name);
    //     } else {
    //         $(this).addClass(name);
    //     }
    // });

    //carousel control--------------------------------------------    
    $('.carousel[data-type="multi"] .item').each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        //for (var i = 0; i < 1; i++) { // here 1 for max 3 items, 2 for 4, 3 for 5...
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        //}
    });
    //------------------------------------------------------------
    //animation of modal images ---------------------------------
    $('.carousel-col img, .carousel-col div, .anatomy1').hover(function() {
        var element = $(this);
        element.removeAttr("title");
        scaleAnimation(element, 0.02, 200, function() {
            //scaleAnimation(element, 0.015, 250);
        });
    }, function() {
        var element = $(this);
        if (element.is(':animated')) { // fixed: quick hover-unhover blocks unhover animation 
            window.setTimeout(function() {
                scaleAnimation(element, 0, 200);
            }, 200);
        } else {
            scaleAnimation(element, 0, 200);
        }
    });
    
    $('.carousel-col img, .carousel-col div, .anatomy1').click(function() {
        $('#myModal .modal-dialog .modal-content .modal-body').html($(this).clone());
        $('#myModal').modal('show');
    });
    //-----------------------------------------------------------

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
});

function animateAll(array) {
    array.forEach(function(name, idx) {
        animateOnHover(name, name + 'a');
    });
}

function animateOnHover(staticClass, animatedClass) {
    $('.' + staticClass).hover(function() {
        $(this).addClass(animatedClass);
    }, function() {
        $(this).removeClass(animatedClass);
    });
}

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

function appearScaleAll(array, maxScale) {
    array.forEach(function(name, idx) {
        appearActivation($('.' + name), function() {
            scaleAnimation($('.' + name), maxScale, 200, function() {
                scaleAnimation($('.' + name), 0, 200);
            });
        });
    });
}

// calls callback when element scrolled into the viewport
function appearActivation(element, callback) {
    $(document).ready(function() {
        var isVisible = true;
        $(window).scroll(function(evt) {
            if (!isVisible && elementInViewport(element[0])) {
                callback(element);
                isVisible = true;
            }
            if (isVisible && !elementInViewport(element[0])) {
                isVisible = false;
            }
        });
    });
}

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}