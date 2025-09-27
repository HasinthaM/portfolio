// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    once: true
  });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  
  // Mobile menu toggle
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      // Toggle hamburger icon
      const icon = navToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
  
  // Back to top button
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
      } else {
        backToTopBtn.classList.add('hidden');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
     // Active section highlighting
     window.addEventListener('scroll', function() {
     const sections = document.querySelectorAll('section[id]');
     const navLinks = document.querySelectorAll('.nav-link');
     
     let current = '';
     sections.forEach(section => {
     const sectionTop = section.offsetTop - 100;
     const sectionHeight = section.clientHeight;
     if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
     }
     });
     
     navLinks.forEach(link => {
     link.classList.remove('text-accent', 'font-semibold');
     // Updated to check for both #id and /id formats
     if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `/${current}`) {
          link.classList.add('text-accent', 'font-semibold');
     }
     });
     });
  
  // Navbar background on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        navbar.classList.add('bg-dark/95', 'shadow-md', 'py-2');
        navbar.classList.remove('bg-transparent', 'py-4');
      } else {
        navbar.classList.remove('bg-dark/95', 'shadow-md', 'py-2');
        navbar.classList.add('bg-transparent', 'py-4');
      }
    });
  }
});

// Smooth scrolling for anchor links without hash in URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
      
      // Update URL without hash
      const sectionName = targetId.substring(1); // Remove the # character
      history.pushState(null, null, `/${sectionName}`);
    }
  });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
  const path = window.location.pathname;
  const sectionName = path.substring(1); // Remove the leading slash
  
  if (sectionName && sectionName !== '') {
    const targetElement = document.getElementById(sectionName);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  } else {
    // Scroll to top if we're on the root URL
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

// Handle page load with section URL
window.addEventListener('load', function() {
  const path = window.location.pathname;
  const sectionName = path.substring(1); // Remove the leading slash
  
  if (sectionName && sectionName !== '') {
    setTimeout(() => {
      const targetElement = document.getElementById(sectionName);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});