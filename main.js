/**
 * WOMEN&KIDS MC — Main Interactive Logic
 * Dra. Ahidé Valeria García Muñoz
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Toggle Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-btn');
    if (button) {
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all other open items
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('open');
          }
        });
        // Toggle current item
        if (isOpen) {
          item.classList.remove('open');
        } else {
          item.classList.add('open');
        }
      });
    }
  });

  // 2. Gallery Carousel Controller
  const galTrack = document.getElementById('galTrack');
  const galPrev = document.getElementById('galPrev');
  const galNext = document.getElementById('galNext');
  const galCards = document.querySelectorAll('.gal-card');

  if (galTrack && galCards.length > 0) {
    let currentIndex = 0;
    const cardWidth = 544; // width + gap (520px + 24px)

    function updateCarousel() {
      // Calculate transform
      const offset = -(currentIndex * cardWidth);
      galTrack.style.transform = `translateX(${offset}px)`;

      // Update card scale and dim states
      galCards.forEach((card, idx) => {
        if (idx === currentIndex) {
          card.classList.remove('gal-dim');
        } else {
          card.classList.add('gal-dim');
        }
      });

      // Update button disabled state styles
      if (galPrev) {
        galPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
        galPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      }
      if (galNext) {
        galNext.style.opacity = currentIndex === galCards.length - 1 ? '0.5' : '1';
        galNext.style.pointerEvents = currentIndex === galCards.length - 1 ? 'none' : 'auto';
      }
    }

    if (galNext) {
      galNext.addEventListener('click', () => {
        if (currentIndex < galCards.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    if (galPrev) {
      galPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    // Initialize carousel on load
    updateCarousel();
  }

  // 3. Smooth Scroll Navigation and Active Link Highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-[#DE5D83]', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#DE5D83]', 'font-semibold');
      }
    });
  });

  // 4. GSAP Entrance and Scroll Animations (if GSAP is loaded)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Panel entrance
    const heroPanel = document.getElementById('heroPanel');
    if (heroPanel) {
      gsap.from(heroPanel, {
        autoAlpha: 0,
        y: 35,
        filter: 'blur(10px)',
        duration: 0.9,
        ease: 'power2.out',
        delay: 0.15
      });
    }

    // Doctor Image entrance
    const doctorImg = document.getElementById('doctorImg');
    if (doctorImg) {
      gsap.from(doctorImg, {
        scale: 1.08,
        duration: 1.2,
        ease: 'power2.out'
      });
    }

    // Bento Cells reveal
    gsap.utils.toArray('.bento-cell').forEach((cell, idx) => {
      gsap.from(cell, {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        delay: idx * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cell,
          start: 'top 85%'
        }
      });
    });

    // Service items staggered reveal
    gsap.utils.toArray('.svc-item').forEach((svc, idx) => {
      gsap.from(svc, {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        delay: (idx % 4) * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: svc,
          start: 'top 88%'
        }
      });
    });
  }
});
