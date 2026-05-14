// load header
fetch('header.html')
    .then(res => res.text())
    .then(html => {
    document.getElementById('header').innerHTML = html;

    // set active page based on current URL
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage == currentPage){
            link.classList.add('active-page');
        }

        // also highlight ABOUT if on any about section page
        if (currentPage.startsWith('about') && linkPage === 'about.html'){
            link.classList.add('active-page');
        }
    })
});

// load about-navbar
fetch('about-navbar.html')
    .then(res => res.text())
    .then(html => {
        const aboutNav = document.getElementById('about-navbar')
        if (aboutNav){
            aboutNav.innerHTML = html;
        }

        // set active about section based on current URL
        const currentPage = window.location.pathname.split('/').pop();
        const aboutLinks = document.querySelectorAll('.about-item a');
        aboutLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage == currentPage) {
                link.classList.add('active-page');
            }
        });

        // hamburger
        const hamburger = document.getElementById('hamburger');
        const navList = document.getElementById('about-list');
        if (hamburger && navList) {
            hamburger.addEventListener('click', () => {
                navList.classList.toggle('open');
            });
        }
    });

// load about-sidebar (per each about page) (sidebarEl = sidebar element)
const sidebarEl = document.getElementById('sidebar');
if (sidebarEl) {
    const sidebarFile = sidebarEl.dataset.sidebar;
    fetch(sidebarFile)
        .then(res => res.text())
        .then(html => {
            sidebarEl.innerHTML = html;
        })
        .catch(err => {
            console.error('Error loading sidebar:', err)
        });
}

// load footer
fetch('footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    });
