document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       MOBILE MENU TOGGLE - ADD THIS FIRST
    =============================== */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinks) {
        // Toggle menu on hamburger click
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navLinks.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
        });

        // Close menu when clicking on a link
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = "";
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
    /* ===============================
       ROLE SELECTION
    =============================== */
    const roles = document.querySelectorAll(".role");
    const roleInput = document.getElementById("roleInput");

    if (roles.length && roleInput) {
        roles.forEach(role => {
            role.addEventListener("click", () => {
                roles.forEach(r => r.classList.remove("active"));
                role.classList.add("active");
                roleInput.value = role.innerText.trim();
            });
        });
    }


    /* ===============================
       HEADER SCROLL EFFECT
    =============================== */
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 80);
    });


    /* ===============================
       DROPDOWN MENU
    =============================== */
    const dropdown = document.querySelector(".dropdown");
    const toggle = document.getElementById("dropdownToggle");

    if (dropdown && toggle) {
        toggle.addEventListener("click", e => {
            e.preventDefault();
            dropdown.classList.toggle("active");
        });

        document.addEventListener("click", e => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("active");
            }
        });
    }


    /* ===============================
       COUNTER ANIMATION
    =============================== */
    const counters = document.querySelectorAll("[data-count]");

    if (counters.length) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const target = +el.dataset.count;
                let current = 0;
                const increment = Math.ceil(target / 80);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = current;
                    }
                }, 30);

                counterObserver.unobserve(el);
            });
        }, { threshold: 0.4 });

        counters.forEach(counter => counterObserver.observe(counter));
    }


    /* ===============================
       SLIDER AUTO ROTATION
    =============================== */
    let currentSlide = 1;
    const totalSlides = 3;

    setInterval(() => {
        currentSlide = currentSlide % totalSlides + 1;
        const radio = document.getElementById("s" + currentSlide);
        if (radio) radio.checked = true;
    }, 4000);


    /* ===============================
       OPPORTUNITIES ROTATION
    =============================== */
    const opportunities = [
        { title: "Learning and Inspiring Sessions", description: "Insights from unicorn founders and entrepreneurs to refine your vision." },
        { title: "Shark Tank-style Startup Pitching", description: "Pitch ideas to investors and receive real-time feedback." },
        { title: "Startup Mentoring", description: "One-on-one guidance from experienced mentors." },
        { title: "Startup EXPO", description: "Showcase innovations to investors and leaders." },
        { title: "Networking Opportunities", description: "Build partnerships with founders and industry experts." },
        { title: "Workshops and Skill-building", description: "Hands-on sessions on marketing, fundraising, leadership." },
        { title: "Access to Funding Networks", description: "Connect with angels, VCs, and grant programs." },
        { title: "Innovation Challenges", description: "Compete, innovate, and gain recognition." },
        { title: "Industry Insights", description: "Understand sectoral trends and market needs." },
        { title: "Community Building", description: "Collaborate with innovators and thought leaders." }
    ];

    const opportunitiesGrid = document.getElementById("opportunities-grid");
    let currentStartIndex = 0;

    function showOpportunities() {
        if (!opportunitiesGrid) return;

        opportunitiesGrid.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const index = (currentStartIndex + i) % opportunities.length;
            const opp = opportunities[index];

            const card = document.createElement("div");
            card.className = "opportunity-card";
            card.innerHTML = `<h3>${opp.title}</h3><p>${opp.description}</p>`;
            opportunitiesGrid.appendChild(card);

            setTimeout(() => card.classList.add("show"), 60);
        }

        currentStartIndex = (currentStartIndex + 3) % opportunities.length;
    }

    showOpportunities();
    setInterval(showOpportunities, 10000);


    /* ===============================
       SUCCESS STORIES FADE-IN
    =============================== */
    const successCards = document.querySelectorAll(".success-card");

    if (successCards.length) {
        const successObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    successObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        successCards.forEach(card => successObserver.observe(card));
    }


    /* ===============================
       BACK TO TOP BUTTON
    =============================== */
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* ===============================
       COPY EMAIL + TOAST
    =============================== */
    window.copyEmail = function () {
        const emailText = document.getElementById("emailText");
        if (!emailText) return;

        navigator.clipboard.writeText(emailText.innerText)
            .then(() => showToast("Email copied to clipboard!"))
            .catch(() => alert("Copy failed"));
    };

    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast-message";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 100);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

});
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

cards.forEach(card => observer.observe(card));
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
            el.classList.remove("fade-out");
        } else {
            el.classList.remove("active");
            el.classList.add("fade-out");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

      function toggleMenu() {
            const menu = document.getElementById("nav-links");
            const btn = document.getElementById("menuBtn");

            menu.classList.toggle("show");

            if (menu.classList.contains("show")) {
                btn.innerHTML = "❌";
            } else {
                btn.innerHTML = "☰";
            }
        }



