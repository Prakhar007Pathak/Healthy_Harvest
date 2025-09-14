// main.js — handles clicks on sidebar, fetches partials, updates URL, and calls init functions
(function () {
    function mapPathToPartial(pathname) {
        if (pathname === '/account' || pathname === '/account/') return '/account/profile-info';
        if (pathname.startsWith('/account/addresses')) return '/account/addresses';
        if (pathname.startsWith('/account/profile-info')) return '/account/profile-info';
        return '/account/profile-info';
    }

    function setActiveLink(pathname) {
        const links = document.querySelectorAll('.sidebar-menu a[data-route]');
        links.forEach(l => {
            const route = l.getAttribute('data-route');
            if ((pathname === '/account' || pathname === '/account/') && route === '/account/profile-info') {
                l.classList.add('active');
            } else if (pathname === '/account/addresses' && route === '/account/addresses') {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });
    }

    function executeInitForRoute(route) {
        if (route.endsWith('/profile-info')) {
            if (window.initProfile) window.initProfile();
        } else if (route.endsWith('/addresses')) {
            if (window.initAddresses) window.initAddresses();
        }
    }

    async function loadRoute(routeUrl, push = true) {
        try {
            const res = await fetch(routeUrl, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
            if (!res.ok) throw new Error('Network error');
            const html = await res.text();
            const content = document.getElementById('content-area');
            content.innerHTML = html;

            // call initializer for loaded partial
            executeInitForRoute(routeUrl);

            // For URL and active state: if profile partial, show /account
            const pathnameToShow = (routeUrl === '/account/profile-info') ? '/account' : routeUrl;
            setActiveLink(pathnameToShow);

            if (push) {
                history.pushState({}, '', pathnameToShow);
            }
        } catch (err) {
            console.error('Error loading partial', err);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('.sidebar-menu a[data-route]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route') || link.getAttribute('href');
                loadRoute(route, true);
            });
        });

        // On initial load, call initializer depending on current location
        const initialRoute = mapPathToPartial(location.pathname);
        executeInitForRoute(initialRoute);
        setActiveLink(location.pathname);

        // handle back/forward
        window.addEventListener('popstate', () => {
            const route = mapPathToPartial(location.pathname);
            loadRoute(route, false);
        });
    });
})();
