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

// Financial Q&A Data Structure
const financialQA = {
  "credit": [
    {
      q: "How do I build credit as a student?",
      a: "Start with a student credit card, keep utilization under 30%, and always pay on time. Even small purchases paid off monthly will build your credit history. Consider becoming an authorized user on a parent's account too!"
    },
    {
      q: "What's a good credit score?",
      a: "700+ is considered good, 750+ is excellent. But as a student, focus on building history first - your score will improve over time with responsible use. Don't stress too much about the number early on."
    },
    {
      q: "Should I pay off my credit card in full?",
      a: "Yes! Always pay the full balance by the due date to avoid interest charges. Contrary to popular belief, you don't need to carry a balance to build credit - that's just expensive."
    },
    {
      q: "How many credit cards should I have?",
      a: "Start with one, maybe two max as a student. Focus on using them responsibly rather than collecting cards. Quality over quantity - build good habits with fewer cards first."
    }
  ],
  "budgeting": [
    {
      q: "How much should I save each month?",
      a: "Start with the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Even saving $50/month as a student builds great habits for later. The key is consistency, not the amount."
    },
    {
      q: "What apps help with budgeting?",
      a: "Mint, YNAB, or even a simple spreadsheet work great. The key is tracking where your money goes - most people are shocked by their spending patterns once they start monitoring."
    },
    {
      q: "How do I stick to a budget?",
      a: "Make it realistic! Build in some fun money so you don't feel deprived. Use the envelope method - allocate specific amounts for categories and when it's gone, it's gone. Track weekly, adjust monthly."
    },
    {
      q: "Should I budget for irregular expenses?",
      a: "Absolutely! Things like textbooks, car repairs, or gifts. Set aside a little each month for these 'surprise' expenses - they're only surprises if you don't plan for them."
    }
  ],
  "investing": [
    {
      q: "Should I invest as a college student?",
      a: "If you have emergency savings and no high-interest debt, absolutely! Even $25/month in an index fund can grow significantly over time thanks to compound interest. Time is your biggest advantage."
    },
    {
      q: "What's an index fund?",
      a: "Think of it as buying a tiny piece of hundreds of companies at once. It's diversified, low-cost, and perfect for beginners. S&P 500 index funds are popular starter choices - you're betting on the overall market."
    },
    {
      q: "How much should I invest?",
      a: "Start small - whatever you can afford to not touch for 5+ years. Maybe $20-50/month. The goal is building the habit and learning, not getting rich quick. Consistency beats big amounts."
    },
    {
      q: "What about individual stocks?",
      a: "Index funds first! Once you have a solid foundation, you can experiment with individual stocks with money you can afford to lose. Think of it as 'play money' - most pros recommend 80-90% index funds."
    }
  ],
  "general": [
    {
      q: "Where do I start with personal finance?",
      a: "Track your spending for a week - just awareness is huge! Then set up a simple budget and start building an emergency fund. Small steps: $1000 emergency fund, then automate savings."
    },
    {
      q: "What's an emergency fund?",
      a: "Money set aside for true emergencies - job loss, medical bills, major repairs. Start with $500-1000, eventually build to 3-6 months of expenses. Keep it in a high-yield savings account."
    },
    {
      q: "Should I pay off student loans early?",
      a: "Depends on the interest rate! If it's above 5-6%, prioritize paying extra. If it's lower, you might invest the extra money instead. Always pay minimums first, then decide where extra money goes."
    }
  ]
};

// Legacy chat state for compatibility (now using chatWidget)
let chatState = {
  isOpen: false,
  messages: [],
  isTyping: false
};

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

// Chat Widget functionality
let chatWidget = {
  isOpen: false,
  isMinimized: false,
  messages: [],
  isTyping: false
};

function openChatWidget() {
  const widget = document.getElementById('chat-widget');
  const window = document.getElementById('chat-window');
  
  // Update state
  chatWidget.isOpen = true;
  chatWidget.isMinimized = false;
  
  // Update UI
  widget.classList.remove('minimized');
  window.classList.add('open');
  window.setAttribute('aria-hidden', 'false');
  
  // Initialize chat with welcome message if empty
  const messagesContainer = document.getElementById('chat-messages');
  if (messagesContainer.children.length === 0) {
    addMessage("Welcome to DeepDive AI! 🚀 Click on any topic below to see how I can help with your financial questions.", 'ai');
  }
  
  // Focus management
  setTimeout(() => {
    window.focus();
  }, 300);
}

function minimizeChatWidget() {
  const widget = document.getElementById('chat-widget');
  const window = document.getElementById('chat-window');
  
  // Update state
  chatWidget.isMinimized = true;
  
  // Update UI
  widget.classList.add('minimized');
  window.setAttribute('aria-hidden', 'true');
  
  // Keep window open but hide body
  // This is handled by CSS
}

function restoreChatWidget() {
  const widget = document.getElementById('chat-widget');
  const window = document.getElementById('chat-window');
  
  // Update state
  chatWidget.isMinimized = false;
  
  // Update UI
  widget.classList.remove('minimized');
  window.setAttribute('aria-hidden', 'false');
  
  // Focus management
  setTimeout(() => {
    window.focus();
  }, 100);
}

function closeChatWidget() {
  const widget = document.getElementById('chat-widget');
  const window = document.getElementById('chat-window');
  
  // Update state
  chatWidget.isOpen = false;
  chatWidget.isMinimized = false;
  
  // Update UI
  window.classList.remove('open');
  window.setAttribute('aria-hidden', 'true');
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = text;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Update chat state
  chatWidget.messages.push({ text, sender, timestamp: Date.now() });
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.textContent = 'DeepDive is thinking';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  chatWidget.isTyping = true;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
  chatWidget.isTyping = false;
}

function findResponseForQuestion(question) {
  // Find exact match in our Q&A data
  const allQuestions = [
    ...financialQA.credit,
    ...financialQA.budgeting,
    ...financialQA.investing,
    ...financialQA.general
  ];
  
  const match = allQuestions.find(qa => qa.q === question);
  if (match) {
    return match.a;
  }
  
  // Default response for unexpected questions
  return "Great question! The full DeepDive AI will have detailed answers to complex questions like this. Join our waitlist to get early access to the complete financial guidance system! 🚀";
}

function handleSuggestionClick(question) {
  if (chatWidget.isTyping) return;
  
  // Disable all suggestion buttons during response
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  suggestionBtns.forEach(btn => btn.disabled = true);
  
  // Add user message
  addMessage(question, 'user');
  
  // Show typing indicator
  showTypingIndicator();
  
  // Simulate realistic thinking delay (1-2 seconds)
  const delay = Math.random() * 1000 + 1000;
  
  setTimeout(() => {
    hideTypingIndicator();
    const response = findResponseForQuestion(question);
    addMessage(response, 'ai');
    
    // Show completion message after a brief delay
    setTimeout(() => {
      addMessage("Want to explore more financial topics? The complete Sharkfin app will have unlimited questions and personalized guidance. Join our waitlist! 📱✨", 'ai');
    }, 1500);
    
    // Re-enable suggestion buttons
    suggestionBtns.forEach(btn => btn.disabled = false);
  }, delay);
}

// Initialize chat widget functionality
document.addEventListener("DOMContentLoaded", () => {
  const chatMinimize = document.getElementById('chat-minimize');
  const chatClose = document.getElementById('chat-close');
  const chatWindow = document.getElementById('chat-window');

  // Minimize button functionality
  if (chatMinimize) {
    chatMinimize.addEventListener('click', (e) => {
      e.stopPropagation();
      if (chatWidget.isMinimized) {
        restoreChatWidget();
      } else {
        minimizeChatWidget();
      }
    });
  }

  // Close button functionality
  if (chatClose) {
    chatClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChatWidget();
    });
  }

  // Set up suggestion button event listeners
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-btn')) {
      const question = e.target.getAttribute('data-question');
      if (question) {
        handleSuggestionClick(question);
      }
    }
  });

  // Enhanced escape key handling
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (chatWidget.isOpen && !chatWidget.isMinimized) {
        minimizeChatWidget();
      }
      
      // Keep existing escape functionality for drawer
      const drawer = document.getElementById('form-drawer');
      if (drawer && drawer.style.display !== 'none') {
        closeFormDrawer();
      }
    }
  });

  // Click outside to minimize (optional)
  document.addEventListener('click', (e) => {
    const widget = document.getElementById('chat-widget');
    if (chatWidget.isOpen && !chatWidget.isMinimized && !widget.contains(e.target)) {
      // Don't auto-minimize on outside click to avoid interference
      // Users can manually minimize or close
    }
  });
});