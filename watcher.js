function ElementWatcher (config, mutConfig) {
    var tracker;
    mutConfig = mutConfig || {};
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
        var mutObserver,
            intervalId,
            mutationObsConfig = { 
                attributes: mutConfig.attributes || true,
                childList: mutConfig.childList || false, 
                subtree: mutConfig.subtree || false, 
                characterData: mutConfig.characterData || false,
                attributeOldValue: mutConfig.attributeOldValue || false,
                characterDataOldValue: mutConfig.characterDataOldValue || false,
                attrubuteFiler: mutConfig.attributeFilter || []
             };

        if (MutationObserver) {
            mutObserver = new MutationObserver(
                function mutCallback (mutations) {
                    config.callback.bind(mutations)();
                }
            );
            mutObserver.observe(document.getElementById(config.watchId), mutationObsConfig);
        } else {
            if (config.fillCallback) {
                intervalId = setInterval(config.fillCallback, 200);
            }
        }
        return mutObserver || intervalId;
    }
}
