var watcher;

$(function() {
    var watchConfig = {
        watchId: "watch-me",
        callback: watchCb,
        fillCallback: checkClass
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

function watchCb () {
    var watchItems = this.filter(function(mutation) {
        var targetMutated = mutation.target.id == "watch-me";
        var classMutated = mutation.attributeName && mutation.attributeName == "class";
        return targetMutated && classMutated;
    });

    if (watchItems.length >= 1) {
        checkClass();
    }
}

function checkClass() {
    if ($("#watch-me").hasClass("changed")) {
        $("#change-me").addClass("indirect-change");
    } else {
        $("#change-me").removeClass("indirect-change");
    }
}
