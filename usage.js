var watcher;
$(function() {
    var watchConfig = {
        watchSelector: "#watch-me",
        callback: checkClass($("#watch-me"), "changed", "#change-me", "indirect-change"),
        fillCallback: checkClass($("#watch-me"), "changed", "#change-me", "indirect-change")
    }

    $("#submit").click(function (e) {
        e.preventDefault();
        $('input.login').toggleClass("submitted");
    });

    watcher = new ElementWatcher(watchConfig);
    watcher.start();
});

function changeClass () {
    $("#watch-me").toggleClass("changed");
}



function checkClass($target, watchClass, effectSelector, toggleClass) {
    return function() {
        console.log(this);
        if ($target.hasClass(watchClass)) {
            $(effectSelector).addClass(toggleClass);
        } else {
            $(effectSelector).removeClass(toggleClass);
        }
    }
}
