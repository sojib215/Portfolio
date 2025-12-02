// script.js

// Animate navbar items
function animateNavItems() {
  const items = document.querySelectorAll('.nav-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('show');
    }, index * 100); // ডিলে 150ms থেকে 100ms করা হলো
  });
}

// Load navbar from nav.html
fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;

    // Animate nav items
    animateNavItems();

    // Select all nav links
    const navLinks = document.querySelectorAll('#nav-menu a');

    // Get current page file name
    const currentPage = window.location.pathname.split("/").pop();

    // Set active class based on current page
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    // Click effect for active border
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        // normal navigation allowed, no preventDefault
      });
    });
  })
  .catch(err => console.error('Navbar load failed:', err));


// Function to check if an element is in the viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
};

// Function to handle the animation based on scroll position
const handleScrollAnimation = () => {
    // Select all elements that need to be animated
    const animatedElements = document.querySelectorAll('.section-animate');

    animatedElements.forEach((el) => {
        // Only run animation if the element is currently not visible
        if (!el.classList.contains('is-visible')) {
            if (isElementInViewport(el)) {
                // Add the 'is-visible' class to trigger the CSS transition/animation
                el.classList.add('is-visible');
            }
        }
    });
};

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Run once on load to animate elements already in the viewport (like the banner)
    handleScrollAnimation();
});

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('resize', handleScrollAnimation);


 // Footer Year
    document.getElementById('current-year-footer').textContent = new Date().getFullYear();

    // Scroll Button
    const btn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 300;
        btn.classList.toggle('opacity-100', show);
        btn.classList.toggle('opacity-0', !show);
        btn.classList.toggle('invisible', !show);
    });
    btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));


     const backToTop = document.getElementById('backToTopLink');

    // Scroll-based fade-in/out
    window.addEventListener('scroll', () => {
        const show = window.scrollY > 300; // 300px scroll threshold
        backToTop.classList.toggle('opacity-100', show);
        backToTop.classList.toggle('opacity-0', !show);
        backToTop.classList.toggle('invisible', !show);
    });

    // Smooth scroll on click
    backToTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // Floating animation for scroll buttons
const floatingElements = [scrollBtn, backToTop];
let floatDirection = 1; // 1 = down, -1 = up
let floatOffset = 0;
const maxOffset = 5; // px
const floatSpeed = 0.5; // px per frame

function floatButtons() {
    floatOffset += floatSpeed * floatDirection;
    if (floatOffset > maxOffset || floatOffset < -maxOffset) floatDirection *= -1;
    floatingElements.forEach(el => {
        el.style.transform = `translateY(${floatOffset}px) scale(${el.classList.contains('hover:scale-110') ? 1.1 : 1})`;
    });
    requestAnimationFrame(floatButtons);
}

// Start floating loop
requestAnimationFrame(floatButtons);


// --- Modal Logic (Required for the list to work) ---
const modal = document.getElementById('serviceModal');
const backdrop = document.getElementById('modalBackdrop');
const panel = document.getElementById('modalPanel');

function openModal(title, description) {
    modal.classList.remove('hidden');
    // ডাটা বসানো
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = description;
    
    // এনিমেশন
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('scale-95', 'opacity-0');
        panel.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// বাকি কোড আগের মতোই...

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        serviceCards.forEach(card => {
          if(filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });




document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.initial-hidden');

    elementsToAnimate.forEach((element, index) => {
        const delay = index * 200; 
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + delay);
    });

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitButton');

    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠাচ্ছি...';
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed', 'bg-gray-500');
            submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> পাঠানো হয়েছে!';
                submitBtn.classList.add('bg-green-600');
                submitBtn.classList.remove('bg-gray-500');
                
                form.reset(); 

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('bg-green-600', 'opacity-75', 'cursor-not-allowed');
                    submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                }, 3000);

            }, 2000);
        });
    }
});

 function openProject(url) {
      window.open(url, "_blank");
    } 

function openPopup(title, link) {
  document.getElementById('popupTitle').innerText = title;
  document.getElementById('popupLink').href = link;

  document.getElementById('popup').classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('popupBox').classList.remove('scale-75', 'opacity-0');
    document.getElementById('popupBox').classList.add('scale-100', 'opacity-100');
  }, 10);
}

function closePopup() {
  const box = document.getElementById('popupBox');
  box.classList.add('scale-75', 'opacity-0');

  setTimeout(() => {
    document.getElementById('popup').classList.add('hidden');
  }, 200);
}

 


    