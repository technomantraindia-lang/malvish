/**
 * MALVIS INDUSTRIES — INTERACTIVE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteModalBtn = document.getElementById('openQuoteModalBtn');
  const partnerWithUsBtn = document.getElementById('partnerWithUsBtn');
  const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');
  const quoteForm = document.getElementById('quoteForm');
  const quoteSuccessMessage = document.getElementById('quoteSuccessMessage');

  // 1. Header scroll effect (blur + subtle shadow)
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle mobile nav links and dropdown toggle
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const parentDropdown = link.closest('.has-dropdown');
        if (parentDropdown && link.classList.contains('dropdown-toggle') && window.innerWidth <= 900) {
          e.preventDefault();
          parentDropdown.classList.toggle('mobile-open');
          return;
        }

        // For non-dropdown links or on desktop, close mobile drawer if open
        if (window.innerWidth <= 900) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close mobile drawer when clicking subcategory links inside dropdown
    document.querySelectorAll('.nav-dropdown-menu a').forEach(subLink => {
      subLink.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 3. Active Nav Link Switching (exclude dropdown category sub-links)
  document.querySelectorAll('.nav-list > .nav-item > .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 900) return;
      document.querySelectorAll('.nav-list > .nav-item > .nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 4. Quote / Partner Modal Handlers
  const openModal = () => {
    if (quoteModal) {
      quoteModal.classList.add('active');
      quoteModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      quoteModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (quoteForm && quoteSuccessMessage) {
          quoteForm.reset();
          quoteForm.style.display = 'flex';
          quoteSuccessMessage.style.display = 'none';
        }
      }, 300);
    }
  };

  if (openQuoteModalBtn) {
    openQuoteModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Bind all quote trigger links
  document.querySelectorAll('a[href="#quote"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (partnerWithUsBtn) {
    partnerWithUsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const whoWeAreCtaBtn = document.getElementById('whoWeAreCtaBtn');
  if (whoWeAreCtaBtn) {
    whoWeAreCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeQuoteModalBtn) {
    closeQuoteModalBtn.addEventListener('click', closeModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 5. Smooth Scroll Navigation for In-Page Buttons
  const knowMoreBtn = document.getElementById('knowMoreBtn');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const exploreProductsBtn = document.getElementById('exploreProductsBtn');
  if (exploreProductsBtn) {
    exploreProductsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 6. Product Card Click Handlers (Auto-select product in Quote Modal)
  const productCards = document.querySelectorAll('.product-card');
  const productInterestSelect = document.getElementById('productInterest');
  const casNumberInput = document.getElementById('casNumber');

  productCards.forEach(card => {
    const arrowBtn = card.querySelector('.product-arrow-btn');
    const productNameEl = card.querySelector('.product-name');
    const productName = productNameEl ? productNameEl.innerText.replace('\n', ' ') : '';

    const handleProductSelect = (e) => {
      e.preventDefault();
      openModal();
      if (casNumberInput) {
        casNumberInput.value = productName;
      }
    };

    if (arrowBtn) {
      arrowBtn.addEventListener('click', handleProductSelect);
    }
  });

  const viewAllProductsBtn = document.getElementById('viewAllProductsBtn');
  if (viewAllProductsBtn) {
    viewAllProductsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // 7. Industry Cards Click Handlers
  const exploreSolutionsBtn = document.getElementById('exploreSolutionsBtn');
  if (exploreSolutionsBtn) {
    exploreSolutionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const industryCards = document.querySelectorAll('.industry-card');
  industryCards.forEach(card => {
    card.addEventListener('click', () => {
      const titleEl = card.querySelector('.industry-card-title');
      const title = titleEl ? titleEl.innerText.replace('\n', ' ') : '';
      openModal();
      if (productInterestSelect) {
        if (title.includes('Pharma')) productInterestSelect.value = 'liquid-bromine';
        else if (title.includes('Agro')) productInterestSelect.value = 'agrochemicals';
        else productInterestSelect.value = 'specialty-chemicals';
      }
    });
  });

  // 8. Banner & Sustainability CTA Click Handlers
  const bannerGetQuoteBtn = document.getElementById('bannerGetQuoteBtn');
  if (bannerGetQuoteBtn) {
    bannerGetQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const qhseCommitmentBtn = document.getElementById('qhseCommitmentBtn');
  if (qhseCommitmentBtn) {
    qhseCommitmentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
      if (productInterestSelect) {
        productInterestSelect.value = 'specialty-chemicals';
      }
    });
  }

  // 9. Footer CTA Click Handlers
  const footerGetQuoteBtn = document.getElementById('footerGetQuoteBtn');
  if (footerGetQuoteBtn) {
    footerGetQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const footerNavQuoteLink = document.getElementById('footerNavQuoteLink');
  if (footerNavQuoteLink) {
    footerNavQuoteLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // 10. Interactive Strategic Pillars Switcher (About Page)
  const pillarsData = [
    {
      num: '01',
      title: 'Unrivalled<br>Expertise',
      desc: 'Decades of collective chemical mastery and specialized processing, enabling reliable, high-purity solutions for global industries.',
      image: 'assets/pillar-facility.jpg',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <path d="M9 3H15M10 3V8.5L5.2 18C4.5 19.3 5.4 21 7 21H17C18.6 21 19.5 19.3 18.8 18L14 8.5V3" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 16H17" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`
    },
    {
      num: '02',
      title: 'New-Edge<br>Technology',
      desc: 'State-of-the-art distillation towers, glass-lined reactors, and automated QA/QC testing labs operating in Saykha GIDC, Bharuch.',
      image: 'assets/about-refinery.jpg',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <circle cx="12" cy="12" r="3" stroke="#C57A22" stroke-width="1.8"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    },
    {
      num: '03',
      title: 'Environment-Friendly<br>Solutions',
      desc: 'Sustainable green chemistry practices engineered to minimize ecological footprints and conserve natural resources.',
      image: 'assets/sustainability-leaf.jpg',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c0 3.5.5 8-2 12a7 7 0 0 1-6 6z" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 21c0-3 1.9-5.5 4.5-6.5" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`
    },
    {
      num: '04',
      title: 'Uncompromising<br>Quality',
      desc: 'Strict batch-by-batch chromatographic inspection ensuring pharma-grade and zero-defect chemical purity.',
      image: 'assets/ind-manufacturing.jpg',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`
    },
    {
      num: '05',
      title: 'Specialty<br>Differentiation',
      desc: 'Custom synthesis, precise halogenation chemistry, and high-value niche bromine derivatives tailored to client specifications.',
      image: 'assets/banner-molecules.jpg',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <circle cx="12" cy="12" r="3" stroke="#C57A22" stroke-width="1.8"/>
        <circle cx="19" cy="5" r="2" stroke="#C57A22" stroke-width="1.8"/>
        <circle cx="5" cy="19" r="2" stroke="#C57A22" stroke-width="1.8"/>
        <path d="M17.5 6.5L14 10M10 14L6.5 17.5" stroke="#C57A22" stroke-width="1.8"/>
      </svg>`
    },
    {
      num: '06',
      title: 'Supply Chain<br>Resilience',
      desc: 'Direct ISO Tank fleet deliveries, dedicated port storage terminals, and dependable international freight logistics.',
      image: 'assets/ind-pharma.jpg',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <rect x="1" y="3" width="15" height="13" rx="2" stroke="#C57A22" stroke-width="1.8"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" stroke="#C57A22" stroke-width="1.8" stroke-linejoin="round"/>
        <circle cx="5.5" cy="18.5" r="2.5" stroke="#C57A22" stroke-width="1.8"/>
        <circle cx="18.5" cy="18.5" r="2.5" stroke="#C57A22" stroke-width="1.8"/>
      </svg>`
    },
    {
      num: '07',
      title: 'Asset<br>Optimization',
      desc: 'Continuous operational refinement, energy recovery systems, and automated predictive maintenance ensuring maximum efficiency.',
      image: 'assets/about-hero.png',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pillar-detail-svg">
        <path d="M3 3V21H21" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 14L11 9L15 13L21 6" stroke="#C57A22" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    }
  ];

  const pillarNavItems = document.querySelectorAll('.pillar-nav-item');
  const pillarPhotoImg = document.getElementById('pillarPhotoImg');
  const pillarBadgeNum = document.getElementById('pillarBadgeNum');
  const pillarIconBox = document.getElementById('pillarIconBox');
  const pillarDetailTitle = document.getElementById('pillarDetailTitle');
  const pillarDetailDesc = document.getElementById('pillarDetailDesc');
  const pillarCounter = document.getElementById('pillarCounter');
  const pillarPrevBtn = document.getElementById('pillarPrevBtn');
  const pillarNextBtn = document.getElementById('pillarNextBtn');

  let currentPillarIndex = 0;

  const updatePillarDisplay = (index) => {
    currentPillarIndex = (index + pillarsData.length) % pillarsData.length;
    const data = pillarsData[currentPillarIndex];

    // Update active class on nav items
    pillarNavItems.forEach((item, i) => {
      if (i === currentPillarIndex) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });

    // Animate content
    if (pillarPhotoImg) {
      pillarPhotoImg.style.opacity = '0';
      setTimeout(() => {
        pillarPhotoImg.src = data.image;
        pillarPhotoImg.style.opacity = '1';
      }, 150);
    }

    if (pillarDetailTitle && pillarDetailDesc) {
      pillarDetailTitle.style.opacity = '0';
      pillarDetailDesc.style.opacity = '0';
      setTimeout(() => {
        if (pillarBadgeNum) pillarBadgeNum.innerText = data.num;
        if (pillarIconBox) pillarIconBox.innerHTML = data.iconSvg;
        pillarDetailTitle.innerHTML = data.title;
        pillarDetailDesc.innerText = data.desc;
        if (pillarCounter) {
          pillarCounter.innerHTML = `<span class="counter-current">${data.num}</span><span class="counter-slash">/</span><span class="counter-total">07</span>`;
        }
        pillarDetailTitle.style.opacity = '1';
        pillarDetailDesc.style.opacity = '1';
      }, 150);
    }
  };

  if (pillarNavItems.length > 0) {
    pillarNavItems.forEach((item, idx) => {
      item.addEventListener('click', () => updatePillarDisplay(idx));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          updatePillarDisplay(idx);
        }
      });
    });

    if (pillarPrevBtn) {
      pillarPrevBtn.addEventListener('click', () => updatePillarDisplay(currentPillarIndex - 1));
    }
    if (pillarNextBtn) {
      pillarNextBtn.addEventListener('click', () => updatePillarDisplay(currentPillarIndex + 1));
    }
  }

  const ctaGetInTouchBtn = document.getElementById('ctaGetInTouchBtn');
  if (ctaGetInTouchBtn) {
    ctaGetInTouchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // 11. Products Page Category Tabs & View Product Modal Trigger
  const categoryTabCards = document.querySelectorAll('.category-tab-card');
  if (categoryTabCards.length > 0) {
    categoryTabCards.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        categoryTabCards.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  const productViewBtns = document.querySelectorAll('.btn-product-view');
  const productSelectDropdown = document.getElementById('productSelect');
  if (productViewBtns.length > 0) {
    productViewBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = btn.getAttribute('data-product');
        if (productName && productSelectDropdown) {
          // Find matching option or set value
          let found = false;
          for (let opt of productSelectDropdown.options) {
            if (opt.value.toLowerCase().includes(productName.toLowerCase()) || productName.toLowerCase().includes(opt.value.toLowerCase())) {
              productSelectDropdown.value = opt.value;
              found = true;
              break;
            }
          }
          if (!found) {
            productSelectDropdown.value = productSelectDropdown.options[1].value;
          }
        }
        openModal();
      });
    });
  }

  const moreProductsQuoteBtn = document.getElementById('moreProductsQuoteBtn');
  if (moreProductsQuoteBtn) {
    moreProductsQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const bottomCtaQuoteBtn = document.getElementById('bottomCtaQuoteBtn');
  if (bottomCtaQuoteBtn) {
    bottomCtaQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const openCtaQuoteBtn = document.getElementById('openCtaQuoteBtn');
  if (openCtaQuoteBtn) {
    openCtaQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  const sustainabilityCtaBtns = document.querySelectorAll('.btn-sustainability-cta');
  if (sustainabilityCtaBtns.length > 0) {
    sustainabilityCtaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  // 12. Quote Form Submission Simulation
  window.handleQuoteSubmit = () => {
    if (quoteForm && quoteSuccessMessage) {
      quoteForm.style.display = 'none';
      quoteSuccessMessage.style.display = 'block';
      setTimeout(() => {
        closeModal();
      }, 3500);
    }
  };
});
