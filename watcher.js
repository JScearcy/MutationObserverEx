var watcher;
$(function() {
    var watchConfig = {
        watchId: "watch-me",
        watchClass: "changed",
        effectId: "change-me",
        effectClass: "indirect-change"
    }
    watcher = new ClassWatcher(watchConfig);
    watcher.start();
});

function ClassWatcher (config) {
    var tracker;
    return {
        start: start,
        stop: stop
    }

    function stop() {
        if (typeof tracker == 'number') {
            clearInterval(tracker);
        } else {
            tracker.disconnect();
        }
    }

    function start() {
        tracker = setWatch(config);
    }

    function setWatch(config) {
        var $el = $("#" + config.watchId),
            mutObserver,
            intervalId,
            mutConfig = { attributes: true };

        if (MutationObserver) {
            mutObserver = new MutationObserver(
                function mutCallback (mutation) {
                    checkClass($el, config.watchClass, config.effectId, config.effectClass);
                }
            );
            mutObserver.observe($el.get(0), mutConfig);
        } else {
            intervalId = setInterval(intervalWatch($el, config.watchClass, config.effectId, config.effectClass), 100);
        }
        return mutObserver || intervalId;
    }

    function intervalWatch (el, watchClass, effectId, effectClass) {
        return function () {
            checkClass(el, watchClass, effectId, effectClass);
        }
    }

    function checkClass($target, watchClass, id, toggleClass) {
        if ($target.hasClass(watchClass)) {
            $("#" + id).addClass(toggleClass);
        } else {
            $("#" + id).removeClass(toggleClass);
        }
    }
}

function changeClass () {
    $("#watch-me").toggleClass("changed");
}