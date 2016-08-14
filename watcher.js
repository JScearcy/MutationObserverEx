function ElementWatcher (config) {
    var tracker;
    
    if (typeof config.callback != 'function' || typeof config.fillCallback != 'function') {
        throw new Error("The config object must have a callback and a polyfill callback");
    }

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
        var $el = $(config.watchSelector),
            mutObserver,
            intervalId,
            mutConfig = { 
                attributes: true,
                childList: true, 
                subtree: true, 
                characterData: true,
                attributeOldValue: true,
                characterDataOldValue: true,
             };

        if (MutationObserver) {
            mutObserver = new MutationObserver(
                function mutCallback (mutations) {
                    config.callback.bind(mutations)();
                }
            );
            mutObserver.observe($el.get(0), mutConfig);
        } else {
            if (config.fillCallback) {
                intervalId = setInterval(config.fillCallback, 200);
            }
        }
        return mutObserver || intervalId;
    }
}
