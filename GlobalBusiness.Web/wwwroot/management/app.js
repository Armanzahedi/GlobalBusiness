document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        $(".socket-wrapper").stop().fadeOut(function () {
            $(this).remove();
        });
    }, 0);

});