document.addEventListener('DOMContentLoaded', () => {
    //console.log('NAV.JS CHARGÉ');

    const trigger = document.querySelector('.wp-block-navigation__responsive-container-open');
    const closeBtn = document.querySelector('.close-menu a');
    if (!trigger) return;

    // === OUVERTURE / FERMETURE MENU MOBILE ===
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        //console.log('HAMBURGER CLIQUÉ');
        document.body.classList.toggle('mobile-menu-open');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.remove('mobile-menu-open');
        });
    }

    // === FERMETURE AVEC ESC ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('mobile-menu-open')) {
            document.body.classList.remove('mobile-menu-open');
        }
    });

    // === ATTACHE LES SOUS-MENUS UNE SEULE FOIS ===
    let eventsAttached = false;

    const attachSubmenus = () => {
        if (eventsAttached) return; // ← CLÉ
        eventsAttached = true;

        const container = document.querySelector('.wp-block-navigation__responsive-container-content');
        if (!container) return;

        //console.log('SOUS-MENUS ATTACHÉS UNE FOIS');

        container.querySelectorAll('li.wp-block-navigation-submenu').forEach(submenu => {
            const labelLink = submenu.querySelector('.wp-block-navigation-item__content');
            const subContainer = submenu.querySelector('.wp-block-navigation__submenu-container');
            const arrowBtn = submenu.querySelector('button.wp-block-navigation__submenu-icon');

            if (!labelLink || !subContainer || !arrowBtn) return;

            const pageUrl = labelLink.href;

            // LABEL → VA À LA PAGE
            labelLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.body.classList.remove('mobile-menu-open');
                setTimeout(() => window.location.href = pageUrl, 300);
            });

            // FLÈCHE → TOGGLE SOUS-MENU
            const cleanArrow = arrowBtn.cloneNode(true);
            arrowBtn.parentNode.replaceChild(cleanArrow, arrowBtn);

            cleanArrow.style.cssText += `
                display: inline-flex !important;
                align-items: center; justify-content: center;
                width: 20px !important; height: 20px !important;
                margin-left: 8px !important;
                background: transparent !important;
                border: none !important;
                cursor: pointer;
                color: #0f0;
            `;

            const svg = cleanArrow.querySelector('svg');
            if (svg) {
                svg.style.cssText = 'width: 12px !important; height: 12px !important; stroke: #0f0 !important; stroke-width: 2 !important;';
            }

            cleanArrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                container.querySelectorAll('.wp-block-navigation__submenu-container').forEach(c => {
                    if (c !== subContainer) c.classList.remove('is-open');
                });

                subContainer.classList.toggle('is-open');
            });
        });
    };

    // === OBSERVER : ATTACHE UNE FOIS QUAND LE MENU EST OUVERT ===
    const observer = new MutationObserver(() => {
        if (document.body.classList.contains('mobile-menu-open') && !eventsAttached) {
            attachSubmenus();
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});
