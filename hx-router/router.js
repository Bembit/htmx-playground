(function() {
    console.log('router.js loaded');

    if (!window.htmx) {
        console.error('HTMX is not loaded!');
        return;
    }

    htmx.defineExtension('router', {
        onEvent: function(name, evt) {
            if (name === "htmx:configRequest") {
                const target = evt.detail.elt;
                const url = (target.getAttribute('hx-get') || target.getAttribute('href')) || target.getAttribute('hx-post') || target.getAttribute('hx-put') || target.getAttribute('hx-delete');
                // need to get the target from the hx-target attribute to deal with popstate later
                const targetSelector = target.getAttribute('hx-target');
                if (url) {
                    console.log(target);
                    console.log('url', url);
                    history.pushState({url: url, target: targetSelector}, "", url);
                    evt.detail.url = url;
                }
            }
        }
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.url) {
            const target = event.state.target || '#main';

            console.log('popstate', event.state.url);

            htmx.ajax('GET', event.state.url, { target: target });
        }
        // this fallback to / as /index
        if (window.location.pathname === '/' || window.location.pathname === '') {
            
            history.replaceState({url: '/', target: 'body'}, "", '/');
        }
    });

})();
