document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.getElementById('burgerButton');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        burgerButton.classList.toggle('active');
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }

    burgerButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerButton.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
});
