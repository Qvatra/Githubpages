$(document).ready(function() {
    if (location.pathname.indexOf('index.php') > -1) {
        redirect();
    } else {
        setInterval(function() {
            var val = +$("#countdown").html();
            $("#countdown").html(val - 1);

            if (val === 1) {
                $('#content').fadeOut(500, redirect);
            }
        }, 1000);
    }
});

function redirect() {
    location.href = 'index.html';
}