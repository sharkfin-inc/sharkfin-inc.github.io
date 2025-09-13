// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime);
    }
    if (entry.entryType === 'first-input') {
      console.log('FID:', entry.processingStart - entry.startTime);
    }
  }
});

// Monitor Core Web Vitals
try {
  perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
} catch (e) {
  // Fallback for unsupported browsers
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initially hide header on page load
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  header.style.opacity = "0";
  header.style.transform = "translateY(-100%)";
  
  // Set dynamic year in footer
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Lazy loading fallback for unsupported browsers
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Trigger hero animations after page is fully loaded
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  const appMockups = document.querySelector(".app-mockups");
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show elements immediately without animation
    if (heroContent) {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }
    if (appMockups) {
      appMockups.style.opacity = "1";
      appMockups.style.transform = "translateY(0)";
    }
  } else {
    // Ensure elements are properly hidden initially
    if (heroContent) {
      heroContent.style.opacity = "0";
      heroContent.style.transform = "translateY(30px)";
    }
    if (appMockups) {
      appMockups.style.opacity = "0";
      appMockups.style.transform = "translateY(40px)";
    }
    
    // Start hero content animation with a short delay
    setTimeout(() => {
      if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      }
    }, 400);
    
    // Start mockup animation with a longer delay for staggered effect
    setTimeout(() => {
      if (appMockups) {
        appMockups.style.opacity = "1";
        appMockups.style.transform = "translateY(0)";
      }
    }, 900);
  }
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const featuresSection = document.querySelector("#main-content");
  
  if (featuresSection) {
    const featuresRect = featuresSection.getBoundingClientRect();
    // Show header when features section reaches the top of the viewport
    if (featuresRect.top <= 75) {
      // Show header with transparent blurred navbar background
      header.style.opacity = "1";
      header.style.transform = "translateY(0)";
      header.style.background = "rgba(255,255,255,0.15)";
      header.style.backdropFilter = "blur(18px)";
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.07)";
    } else {
      // Hide header when above features section
      header.style.opacity = "0";
      header.style.transform = "translateY(-100%)";
      header.style.background = "transparent";
      header.style.backdropFilter = "none";
      header.style.boxShadow = "none";
    }
  }

  // Hero background scroll effect
  const hero = document.querySelector(".hero");
  if (hero) {
    // ADJUST THIS VALUE for scroll effect window (in px)
    const SCROLL_WINDOW = window.innerHeight * 0.5; // Use 50% of viewport height for effect
    // Get hero's position relative to viewport
    const rect = hero.getBoundingClientRect();
    // Only animate if hero is in viewport
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      // Calculate scroll position within effect window
      const scrollY = window.scrollY;
      const scrollWithinWindow = Math.max(0, Math.min(SCROLL_WINDOW, scrollY));
      // Move background position Y upward as you scroll down (subtle parallax effect)
      const parallaxOffset = scrollWithinWindow * 0.3;
      hero.style.backgroundPositionY = `calc(50% - ${parallaxOffset}px)`;
    } else if (rect.bottom <= 0) {
      // Reset when hero is completely scrolled past
      hero.style.backgroundPositionY = "center";
    }
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".feature-card, .stat-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Add some interactive elements
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02) rotate(-1deg)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1) rotate(0deg)";
  });
});

// Modal functionality
document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const privacyModal = document.getElementById("privacy-modal");
  const termsModal = document.getElementById("terms-modal");
  const privacyLink = document.getElementById("privacy-link");
  const termsLink = document.getElementById("terms-link");
  const closeButtons = document.querySelectorAll(".close");

  // Function to open modal
  function openModal(modal) {
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    // Focus on the modal
    modal.querySelector(".modal-content").focus();
  }

  // Function to close modal
  function closeModal(modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto"; // Restore scrolling
    // Return focus to the element that opened the modal
    if (modal.id === "privacy-modal") {
      document.getElementById("privacy-link").focus();
    } else if (modal.id === "terms-modal") {
      document.getElementById("terms-link").focus();
    }
  }

  // Open privacy policy modal
  privacyLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });

  // Open terms of use modal
  termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(termsModal);
  });

  // Close modal when clicking close button
  closeButtons.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modalId = closeBtn.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      closeModal(modal);
    });
  });

  // Close modal when clicking outside of modal content
  [privacyModal, termsModal].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (privacyModal.classList.contains("show")) {
        closeModal(privacyModal);
      }
      if (termsModal.classList.contains("show")) {
        closeModal(termsModal);
      }
    }
  });
});

// Form Drawer functionality
function openFormDrawer() {
  const drawer = document.getElementById('form-drawer');
  const iframe = document.getElementById('waitlist-form');
  
  // Show the drawer with animation
  drawer.style.display = 'flex';
  drawer.style.opacity = '0';
  
  // Force a reflow to ensure the display change is applied
  drawer.offsetHeight;
  
  // Animate in
  drawer.style.transition = 'opacity 0.3s ease';
  drawer.style.opacity = '1';
  
  // Animate the drawer content from the right
  const drawerContent = drawer.querySelector('.form-drawer-content');
  drawerContent.style.transform = 'translateX(100%)';
  drawerContent.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Trigger the slide-in animation
  setTimeout(() => {
    drawerContent.style.transform = 'translateX(0)';
  }, 10);
  
  // Load the embedded form if not already loaded
  if (!iframe.src.includes('embedded=true')) {
    iframe.src = 'https://docs.google.com/forms/d/e/1FAIpQLSeB-hsHuP8JsoD8YaaEsCsdPRcygKHoUkbzLEdv_KPaHfqQ9A/viewform?usp=dialog';
  }
  
  // Prevent background scrolling
  document.body.style.overflow = 'hidden';
  
  // Focus management for accessibility
  setTimeout(() => {
    drawer.querySelector('.form-drawer-close').focus();
  }, 350);
}

function closeFormDrawer() {
  const drawer = document.getElementById('form-drawer');
  const drawerContent = drawer.querySelector('.form-drawer-content');
  
  // Animate out
  drawerContent.style.transform = 'translateX(100%)';
  drawer.style.opacity = '0';
  
  // Hide after animation completes
  setTimeout(() => {
    drawer.style.display = 'none';
    drawer.style.transition = '';
    drawerContent.style.transition = '';
    drawerContent.style.transform = '';
  }, 300);
  
  // Restore background scrolling
  document.body.style.overflow = 'auto';
}

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('form-drawer');
    if (drawer && drawer.style.display !== 'none') {
      closeFormDrawer();
    }
  }
});