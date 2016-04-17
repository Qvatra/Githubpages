$(document).ready(function() {
    setInterval(function() {
        var val = +$("#countdown").html();
        if (val > 0) {
            $("#countdown").html(val - 1);
        }
        if (val === 1) {
            $('#content').fadeOut(500, redirect);
        }
    }, 1000);
});

function redirect() {
    window.location.replace("http://spritetools.com");
}