(function() {
    console.log('router.js loaded');

    if (!window.htmx) {
        console.error('HTMX is not loaded!');
        return;
    }

    // this is tricky
    // need to think about how to handle the urls with query params
    function trimUrl(url) {
        if (url.startsWith('./')) {
          url = url.substring(2);
        }
        // return the part of the URL after the first "/"
        return '/' + url.split('/').pop();
    }

    // register the extension with HTMX
    htmx.defineExtension('router', {
        onEvent: function(name, evt) {
            // HTMX request initialization
            if (name === "htmx:configRequest") {
                const target = evt.detail.elt;
                // need to trim the url to get the /index.html only
                const url = (target.getAttribute('hx-get') || target.getAttribute('href')) || target.getAttribute('hx-post') || target.getAttribute('hx-put') || target.getAttribute('hx-delete');
                // need to get the target from the hx-target attribute to deal with popstate later
                const targetSelector = target.getAttribute('hx-target');

                if (url) {
                    console.log(target);
                    console.log('url', url);
                    // event detail for later use
                    evt.detail.url = url;
                }
            }

            // HTMX which request.
            // after request should handle the after fetch
            // configrequest is enough to fire before and update as long as it's client side only.
            // since it only works from injected links.

            // trimmed url works, but on refresh we loose the path since it's no longer tracking /folder/index.html
            // can we force on refresh the url? since that's the full value. 

            // 1. we either push the full url /folder/index.html and just show the partial.
            // 2. or we revert back from this url trimming and deal with the folder/folder/folder issue.
            // 3. now refreshing the page screws it up too

            if (name === "htmx:configRequest") {
                const url = evt.detail.url;
                const trimmedUrl = trimUrl(url);
                if (url) {
                    history.pushState({url: trimmedUrl}, "", trimmedUrl);
                    console.log('history.pushState', url);
                }
            }
        }
    });

    // browser back/forward navigation
    // also should this be in an afterSettle event?
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.url) {
            // fallback to the main target if no target is specified
            const target = event.state.target || '#main';
            console.log('popstate', event.state.url);
			// ?????????? read the hx target of the clicked anchor an initiataor. target from somewhere
            htmx.ajax('GET', event.state.url, { target: target });

        }
    });

})();
