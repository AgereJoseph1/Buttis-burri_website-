// Enhanced User Experience Scripts for Butt Tis buuri Scholarship Fund

(function() {
  'use strict';

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar-default');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Add loading animation to buttons
  document.querySelectorAll('a.btn, button.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.href && !this.href.includes('#')) {
        // Add loading state for external links
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading...';
        this.disabled = true;
        
        // Reset after 2 seconds if still on page
        setTimeout(() => {
          this.innerHTML = originalText;
          this.disabled = false;
        }, 2000);
      }
    });
  });

  // Animate elements on scroll
  if ('IntersectionObserver' in window) {
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Add animation to sections
    document.querySelectorAll('.bg-white, .card, .accordion .card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      animateObserver.observe(el);
    });
  }

  // Enhanced accordion interaction
  document.querySelectorAll('.accordion .card-header').forEach(header => {
    header.addEventListener('click', function() {
      const card = this.closest('.card');
      const isExpanded = card.querySelector('.collapse.show');
      
      // Add animation class
      if (!isExpanded) {
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // Add smooth reveal to lists
  document.querySelectorAll('ul.list-unstyled li').forEach((li, index) => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    li.style.transition = `opacity 0.4s ease-out ${index * 0.1}s, transform 0.4s ease-out ${index * 0.1}s`;
    
    setTimeout(() => {
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    }, 100 + (index * 50));
  });

  // Performance: Preload critical images
  const criticalImages = [
    './assets/images/new/logo.jpeg',
    './assets/images/new/bg.jpeg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Add touch feedback for mobile
  if ('ontouchstart' in window) {
    document.querySelectorAll('.btn, .card, .nav-link').forEach(el => {
      el.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      el.addEventListener('touchend', function() {
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });
  }

  // Console message for developers
  console.log('%cButt Tis buuri Scholarship Fund', 'color: #ffc107; font-size: 20px; font-weight: bold;');
  console.log('%cHelping Students Build a Stronger Tomorrow', 'color: #666; font-size: 12px;');
})();

