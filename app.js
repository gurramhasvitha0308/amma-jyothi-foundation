document.addEventListener('DOMContentLoaded', () => {
  // Render Dynamic Content if target elements exist
  renderHomeFocusCarousel();
  renderProgramsGrid();

  // Initialize Modules
  initNavigation();
  initMobileMenu();
  initStatsCounter();
  initCarousels();
  initModals();
  initFocusModals();
  initFormValidation();
  initGalleryLightbox();
});

/* ==========================================================================
   0. SHARED FOCUS AREAS DATA (SINGLE SOURCE OF TRUTH)
   ========================================================================== */
const FOCUS_AREAS_DATA = [
  {
    id: "elderly",
    title: "Aged & Elderly Welfare",
    icon: "👵",
    shortDesc: "Restoring comfort, medical access, and personal dignity to senior citizens lacking family support.",
    tags: ["🍲 Nutrition Care", "🩺 Health Advocacy", "🤝 Social Visits"],
    details: [
      "Weekly grocery pack distributions and warm meals for vulnerable senior citizens",
      "Facilitating access to diagnostic checkups and general medical camps",
      "Mitigating isolation through weekly volunteer visits and emotional companionship"
    ],
    pending: "Beneficiary numbers pending NGO verification."
  },
  {
    id: "children",
    title: "Children's Welfare",
    icon: "👧",
    shortDesc: "Supporting literacy, school supply packages, and educational enrollment for underprivileged kids.",
    tags: ["📚 Literacy Boost", "🎒 School Supply Kits", "🍎 Nutrition Support"],
    details: [
      "Providing supplementary study books, notebooks, and writing materials",
      "Distributing school supply packs to children from disadvantaged families",
      "Supporting basic nutrition and health awareness drives in community centers"
    ],
    pending: "School enrollments and beneficiary numbers pending NGO verification."
  },
  {
    id: "women",
    title: "Women's Empowerment",
    icon: "👩",
    shortDesc: "Empowering women in rural and semi-urban communities through skills and awareness sessions.",
    tags: ["💼 Skill Awareness", "🩺 Women's Health", "📊 Financial Literacy"],
    details: [
      "Providing basic skills training and micro-enterprise awareness workshops",
      "Organizing health and hygiene information sessions for local women",
      "Promoting financial literacy and self-reliance groups in rural areas"
    ],
    pending: "Training session participant numbers pending NGO verification."
  },
  {
    id: "health",
    title: "Health & Family Welfare",
    icon: "🏥",
    shortDesc: "Organizing diagnostic medical checkups and health awareness drives for local families.",
    tags: ["🩺 Diagnostic Camps", "🧼 Hygiene Drives", "🥗 Nutrition Guidance"],
    details: [
      "Setting up basic diagnostic checkup desks in Saidabad and neighboring areas",
      "Distributing hygiene guidelines and wellness kits to families",
      "Hosting nutrition counselling sessions for mothers and children"
    ],
    pending: "Camps held and diagnostic patient metrics pending NGO verification."
  },
  {
    id: "education",
    title: "Education & Literacy",
    icon: "📚",
    shortDesc: "Fostering basic learning materials, libraries, and coaching environments for local youth.",
    tags: ["📖 Adult Literacy", "📚 Study Centers", "💻 Computer Basics"],
    details: [
      "Hosting basic adult literacy sessions to improve local reading skills",
      "Equipping small community study hubs with dictionaries and storybooks",
      "Promoting elementary computer usage guidance for local students"
    ],
    pending: "Student attendee metrics pending NGO verification."
  },
  {
    id: "disaster",
    title: "Disaster Management",
    icon: "🌪",
    shortDesc: "Distributing dry rations and emergency supplies during floods or local weather extremes.",
    tags: ["📦 Relief Supplies", "🌧 Flood Distribution", "💧 Pure Drinking Water"],
    details: [
      "Assembling and distributing dry ration packs during climate emergencies",
      "Providing basic emergency blankets and clothing packs to families in low-lying areas",
      "Coordinating immediate clean water supply distribution in affected districts"
    ],
    pending: "Relief kit distribution numbers pending NGO verification."
  },
  {
    id: "rural",
    title: "Rural Development",
    icon: "🌾",
    shortDesc: "Developing village outreach programs focused on clean drinking water and sanitation.",
    tags: ["💧 Clean Water", "🚽 Basic Sanitation", "🌾 Poverty Alleviation"],
    details: [
      "Promoting simple clean drinking water filtration systems in rural blocks",
      "Raising awareness and support for local sanitation structures",
      "Coordinating poverty relief food drives in remote hamlets"
    ],
    pending: "Village project logs pending NGO verification."
  },
  {
    id: "skills",
    title: "Skill & Vocational Training",
    icon: "✂",
    shortDesc: "Promoting financial self-reliance through basic digital literacy and tailoring workshops.",
    tags: ["🧵 Tailoring Classes", "💻 Digital Literacy", "🔨 Vocational Crafts"],
    details: [
      "Setting up basic sewing machine practice sessions for local women",
      "Hosting basic keyboard and spreadsheet software orientation classes",
      "Supporting vocational craft initiatives to foster independent livelihoods"
    ],
    pending: "Graduate and workshop metrics pending NGO verification."
  }
];

/* ==========================================================================
   DYNAMIC HTML RENDERERS
   ========================================================================== */
function renderHomeFocusCarousel() {
  const track = document.querySelector('#home-focus-carousel-track');
  if (!track) return;

  track.innerHTML = FOCUS_AREAS_DATA.map(item => `
    <div class="carousel-slide">
      <div class="card focus-card">
        <div class="card-icon" aria-hidden="true">${item.icon}</div>
        <h3 class="card-title">${item.title}</h3>
        <div class="card-tags">
          ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>
        <p class="card-text">${item.shortDesc}</p>
        <button class="btn btn-secondary" style="margin-top: auto;" data-focus-id="${item.id}">Learn More</button>
        <span class="card-pending-caption">${item.pending}</span>
      </div>
    </div>
  `).join('');
}

function renderProgramsGrid() {
  const grid = document.querySelector('#programs-grid');
  if (!grid) return;

  grid.innerHTML = FOCUS_AREAS_DATA.map(item => `
    <div class="card focus-card">
      <div class="card-icon" aria-hidden="true">${item.icon}</div>
      <h3 class="card-title">${item.title}</h3>
      <div class="card-tags">
        ${item.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
      </div>
      <p class="card-text">${item.shortDesc}</p>
      <button class="btn btn-secondary" style="margin-top: auto;" data-focus-id="${item.id}">Learn More &rarr;</button>
      <span class="card-pending-caption">${item.pending}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   1. NAVIGATION & ACTIVE LINK HIGH-LIGHTING
   ========================================================================== */
function initNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isRootHome = (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('/index.html')));
    const isMatchingSubpage = href !== 'index.html' && currentPath.endsWith(href);
    
    if (isRootHome || isMatchingSubpage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  const header = document.querySelector('.header-site');
  if (header) {
    const toggleHeaderSticky = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    toggleHeaderSticky();
    window.addEventListener('scroll', toggleHeaderSticky);
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION HAMBURGER MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navSite = document.querySelector('.nav-site');
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex="0"]';
  
  if (!toggleBtn || !navSite) return;

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('active');
    navSite.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.focus();
  };

  const openMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('active');
    navSite.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    const focusables = navSite.querySelectorAll(focusableSelectors);
    if (focusables.length > 0) {
      setTimeout(() => focusables[0].focus(), 100);
    }
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navSite.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const navLinks = navSite.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  navSite.addEventListener('keydown', (e) => {
    if (!navSite.classList.contains('active')) return;
    
    const focusables = navSite.querySelectorAll(focusableSelectors);
    if (focusables.length === 0) return;
    
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navSite.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. STATS COUNT-UP ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statsSection = document.querySelector('.stats-section');
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  if (counters.length === 0 || !statsSection) return;

  let hasRun = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(easeOutQuad * target);
        
        counter.textContent = currentValue + suffix;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target + suffix;
        }
      };

      requestAnimationFrame(animate);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        runCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsSection);
}

/* ==========================================================================
   4. DYNAMIC & COMPLIANT RESPONSIVE CAROUSEL CLASS
   ========================================================================== */
class ResponsiveCarousel {
  constructor(container, options = {}) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.slides = Array.from(this.track.children);
    this.nextButton = container.querySelector('.carousel-nav.next');
    this.prevButton = container.querySelector('.carousel-nav.prev');
    this.playPauseButton = container.querySelector('.carousel-play-pause');
    
    this.options = Object.assign({
      autoplay: false,
      interval: 8000,
      slidesPerViewMobile: 1,
      slidesPerViewTablet: 2,
      slidesPerViewDesktop: 3
    }, options);
    
    this.currentIndex = 0;
    this.isPlaying = this.options.autoplay;
    this.autoplayTimer = null;
    this.startX = 0;
    this.endX = 0;
    
    if (this.slides.length === 0) return;
    this.init();
  }
  
  init() {
    // Add initialized CSS hooks
    this.container.classList.add('carousel-initialized');
    
    // Set WAI-ARIA roles
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-roledescription', 'carousel');
    this.track.setAttribute('aria-live', this.isPlaying ? 'off' : 'polite');
    
    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}`);
    });
    
    this.createDots();
    this.updateSlidePosition();

    // Event Listeners
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.next();
        this.stopAutoplay();
      });
    }
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => {
        this.prev();
        this.stopAutoplay();
      });
    }
    
    if (this.playPauseButton) {
      this.updatePlayPauseButton();
      this.playPauseButton.addEventListener('click', () => {
        if (this.isPlaying) {
          this.stopAutoplay();
        } else {
          this.startAutoplay();
        }
      });
    }
    
    // Touch Navigation
    this.track.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
    }, { passive: true });
    
    this.track.addEventListener('touchend', (e) => {
      this.endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });
    
    // Focus & Hover pauses
    this.container.addEventListener('mouseenter', () => {
      if (this.isPlaying) this.pauseTimer();
    });
    this.container.addEventListener('mouseleave', () => {
      if (this.isPlaying) this.resumeTimer();
    });
    this.container.addEventListener('focusin', () => {
      if (this.isPlaying) this.pauseTimer();
    });
    this.container.addEventListener('focusout', () => {
      if (this.isPlaying) this.resumeTimer();
    });
    
    window.addEventListener('resize', () => this.updateSlidePosition());
    
    // Media Query prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      this.isPlaying = false;
      this.updatePlayPauseButton();
    }
    
    if (this.isPlaying) {
      this.startAutoplay();
    }
  }
  
  getSlidesPerView() {
    const width = window.innerWidth;
    if (width >= 992) return this.options.slidesPerViewDesktop;
    if (width >= 768) return this.options.slidesPerViewTablet;
    return this.options.slidesPerViewMobile;
  }
  
  updateSlidePosition() {
    const slidesPerView = this.getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    
    this.slides.forEach(slide => {
      slide.style.flex = `0 0 ${slideWidth}%`;
    });
    
    const maxIndex = this.slides.length - slidesPerView;
    if (this.currentIndex > maxIndex) {
      this.currentIndex = Math.max(0, maxIndex);
    }
    
    const transformPercent = -(this.currentIndex * slideWidth);
    this.track.style.transform = `translateX(${transformPercent}%)`;
    
    this.updateDotsActive();
  }
  
  next() {
    const slidesPerView = this.getSlidesPerView();
    const maxIndex = this.slides.length - slidesPerView;
    
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // wrap
    }
    this.updateSlidePosition();
  }
  
  prev() {
    const slidesPerView = this.getSlidesPerView();
    const maxIndex = this.slides.length - slidesPerView;
    
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(0, maxIndex);
    }
    this.updateSlidePosition();
  }
  
  handleSwipe() {
    const deltaX = this.endX - this.startX;
    const threshold = 50;
    if (deltaX < -threshold) {
      this.next();
      this.stopAutoplay();
    } else if (deltaX > threshold) {
      this.prev();
      this.stopAutoplay();
    }
  }
  
  createDots() {
    const dotsContainer = this.container.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const dotsCount = this.slides.length;
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Navigate to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateSlidePosition();
        this.stopAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  updateDotsActive() {
    const dots = this.container.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }
  
  startAutoplay() {
    this.isPlaying = true;
    this.track.setAttribute('aria-live', 'off');
    this.updatePlayPauseButton();
    this.resumeTimer();
  }
  
  stopAutoplay() {
    this.isPlaying = false;
    this.track.setAttribute('aria-live', 'polite');
    this.updatePlayPauseButton();
    this.pauseTimer();
  }
  
  pauseTimer() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
  
  resumeTimer() {
    this.pauseTimer();
    if (this.isPlaying) {
      this.autoplayTimer = setInterval(() => this.next(), this.options.interval);
    }
  }
  
  updatePlayPauseButton() {
    if (!this.playPauseButton) return;
    if (this.isPlaying) {
      this.playPauseButton.innerHTML = '⏸';
      this.playPauseButton.setAttribute('aria-label', 'Pause auto-advancing slides');
    } else {
      this.playPauseButton.innerHTML = '▶';
      this.playPauseButton.setAttribute('aria-label', 'Play auto-advancing slides');
    }
  }
}

function initCarousels() {
  // Focus Areas Carousel: Autoplay enabled
  const focusCarouselEl = document.querySelector('#home-focus-carousel');
  if (focusCarouselEl) {
    new ResponsiveCarousel(focusCarouselEl, {
      autoplay: true,
      interval: 8000,
      slidesPerViewMobile: 1,
      slidesPerViewTablet: 2,
      slidesPerViewDesktop: 3
    });
  }

  // Testimonials Carousel: Autoplay enabled
  const testimonialCarouselEl = document.querySelector('#home-testimonials-carousel');
  if (testimonialCarouselEl) {
    new ResponsiveCarousel(testimonialCarouselEl, {
      autoplay: true,
      interval: 8000,
      slidesPerViewMobile: 1,
      slidesPerViewTablet: 1,
      slidesPerViewDesktop: 2
    });
  }

  // Gallery Carousel: Autoplay Enabled with Play/Pause button
  const galleryCarouselEl = document.querySelector('#home-gallery-carousel');
  if (galleryCarouselEl) {
    new ResponsiveCarousel(galleryCarouselEl, {
      autoplay: true,
      interval: 8000,
      slidesPerViewMobile: 1,
      slidesPerViewTablet: 2,
      slidesPerViewDesktop: 3
    });
  }
}

/* ==========================================================================
   5. GENERAL MODAL INTERACTION
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const backdrops = document.querySelectorAll('.modal-backdrop');
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex="0"]';
  
  let lastActiveElement = null;

  const openModal = (modalId) => {
    const modal = document.querySelector(modalId);
    if (!modal) return;

    lastActiveElement = document.activeElement;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const focusables = modal.querySelectorAll(focusableSelectors);
    if (focusables.length > 0) {
      setTimeout(() => focusables[0].focus(), 50);
    }
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-modal-target');
      openModal(target);
    });
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      closeModal(modal);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  backdrops.forEach(modal => {
    modal.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      
      const focusables = modal.querySelectorAll(focusableSelectors);
      if (focusables.length === 0) return;
      
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
      
      if (e.key === 'Escape') {
        closeModal(modal);
      }
    });
  });
}

/* ==========================================================================
   6. FOCUS AREAS MODAL DETAILS SYSTEM
   ========================================================================== */
function initFocusModals() {
  const detailModal = document.querySelector('#focus-detail-modal');
  if (!detailModal) return;
  
  const titleEl = detailModal.querySelector('.modal-title');
  const bodyEl = detailModal.querySelector('.modal-body');
  const closeBtn = detailModal.querySelector('.modal-close');
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex="0"]';
  
  let lastActiveElement = null;

  const openDetail = (id) => {
    const data = FOCUS_AREAS_DATA.find(item => item.id === id);
    if (!data) return;

    lastActiveElement = document.activeElement;
    titleEl.textContent = data.title;

    let bulletsHTML = '<ul class="modal-bullet-list">';
    data.details.forEach(point => {
      bulletsHTML += `<li class="modal-bullet-item">${point}</li>`;
    });
    bulletsHTML += '</ul>';

    bodyEl.innerHTML = `
      <p style="font-size: 1.125rem; font-weight: 600; color: var(--primary); display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span>${data.icon}</span> ${data.shortDesc}
      </p>
      ${bulletsHTML}
      <span class="card-pending-caption">${data.pending}</span>
    `;

    detailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus trap setup
    setTimeout(() => {
      closeBtn.focus();
    }, 50);
  };

  const closeDetail = () => {
    detailModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  // Delegate click listener on document for dynamic rendered cards
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-focus-id]');
    if (trigger) {
      e.preventDefault();
      const id = trigger.getAttribute('data-focus-id');
      openDetail(id);
    }
  });

  closeBtn.addEventListener('click', closeDetail);
  
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      closeDetail();
    }
  });

  detailModal.addEventListener('keydown', (e) => {
    if (!detailModal.classList.contains('active')) return;
    
    const focusables = detailModal.querySelectorAll(focusableSelectors);
    if (focusables.length === 0) return;
    
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }

    if (e.key === 'Escape') {
      closeDetail();
    }
  });
}

/* ==========================================================================
   7. FORM VALIDATION
   ========================================================================== */
function initFormValidation() {
  const contactForm = document.querySelector('#contact-form');
  const volunteerForm = document.querySelector('#volunteer-form');

  const validateInput = (input, rules) => {
    const val = input.value.trim();
    let isValid = true;
    let errorMsg = '';

    if (rules.required && !val) {
      isValid = false;
      errorMsg = 'This field is required.';
    } else if (rules.email && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (rules.phone && val) {
      const phoneClean = val.replace(/[-\s()]/g, '');
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phoneClean)) {
        isValid = false;
        errorMsg = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (!isValid) {
      input.classList.add('is-invalid');
      const feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = errorMsg;
      }
    } else {
      input.classList.remove('is-invalid');
    }

    return isValid;
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = contactForm.querySelector('#contact-name');
      const emailInput = contactForm.querySelector('#contact-email');
      const phoneInput = contactForm.querySelector('#contact-phone');
      const messageInput = contactForm.querySelector('#contact-message');

      const isNameValid = validateInput(nameInput, { required: true });
      const isEmailValid = validateInput(emailInput, { required: true, email: true });
      const isPhoneValid = validateInput(phoneInput, { phone: true });
      const isMessageValid = validateInput(messageInput, { required: true });

      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        showToast('Thank you! Your message has been sent successfully. We will get back to you shortly.');
        contactForm.reset();
      }
    });

    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = volunteerForm.querySelector('#vol-name');
      const emailInput = volunteerForm.querySelector('#vol-email');
      const phoneInput = volunteerForm.querySelector('#vol-phone');
      const messageInput = volunteerForm.querySelector('#vol-message');

      const isNameValid = validateInput(nameInput, { required: true });
      const isEmailValid = validateInput(emailInput, { required: true, email: true });
      const isPhoneValid = validateInput(phoneInput, { required: true, phone: true });
      const isMessageValid = validateInput(messageInput, { required: false });

      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        showToast('Thank you for volunteering! We have received your application.');
        volunteerForm.reset();
        
        const modal = volunteerForm.closest('.modal-backdrop');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });

    volunteerForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-message">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

/* ==========================================================================
   8. GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('#gallery-lightbox');
  
  if (galleryItems.length === 0 || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  let currentIndex = 0;
  const images = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('.gallery-img');
    const title = item.querySelector('.gallery-title').textContent;
    const category = item.querySelector('.gallery-category').textContent;
    const fullSize = img.getAttribute('data-fullsize') || img.getAttribute('src');

    images.push({
      src: fullSize,
      caption: `${title} (${category})`
    });

    item.addEventListener('click', () => {
      currentIndex = index;
      openLightbox();
    });
    
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        currentIndex = index;
        openLightbox();
      }
    });
  });

  const openLightbox = () => {
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (galleryItems[currentIndex]) {
      galleryItems[currentIndex].focus();
    }
  };

  const updateLightbox = () => {
    const item = images[currentIndex];
    lightboxImg.setAttribute('src', item.src);
    lightboxImg.setAttribute('alt', item.caption);
    lightboxCaption.textContent = item.caption;
  };

  const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  };

  const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  };

  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);
  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      nextImage();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
      e.preventDefault();
    } else if (e.key === 'Tab') {
      const focusables = lightbox.querySelectorAll('button');
      if (focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });
}
