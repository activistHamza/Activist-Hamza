document.addEventListener('DOMContentLoaded', () => {
  // --- Smooth Scrolling for Navigation ---
  document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header
          behavior: 'smooth'
        });
      }

      // Update active class
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // --- Dark/Light Mode Toggle ---
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;

  // Check for user's preference in localStorage or default to dark
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> <i class="fas fa-sun"></i>'; // Sun icon for light mode
  } else {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> <i class="fas fa-moon"></i>'; // Moon icon for dark mode
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i> <i class="fas fa-sun"></i>'; // Show moon to switch to dark
    } else {
      localStorage.setItem('theme', 'dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i> <i class="fas fa-moon"></i>'; // Show sun to switch to light
    }
  });

  // --- Scroll-triggered Animations (Intersection Observer) ---
  const sections = document.querySelectorAll('.section');
  const options = {
    root: null, // relative to the viewport
    rootMargin: '0px',
    threshold: 0.2 // 20% of section visible to trigger
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally, unobserve once visible if you only want the animation to play once
        // observer.unobserve(entry.target);
      } else {
        // Optional: remove 'visible' class when out of view
        // entry.target.classList.remove('visible');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Active Navigation Link on Scroll ---
  window.addEventListener('scroll', () => {
    const headerHeight = document.querySelector('header').offsetHeight;
    let currentActive = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100; // Adjust for header and a buffer
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentActive = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentActive) {
        link.classList.add('active');
      }
    });
  });

  // --- Mobile Navigation Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link'); // Get all nav links

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Optional: Change icon (e.g., bars to times)
    // menuToggle.querySelector('i').classList.toggle('fa-bars');
    // menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Close menu when a navigation link is clicked (for better mobile UX)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        // Optional: Revert icon if you implemented the icon change
        // menuToggle.querySelector('i').classList.remove('fa-times');
        // menuToggle.querySelector('i').classList.add('fa-bars');
      }
    });
  });
});
