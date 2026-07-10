// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close mobile nav on link click
nav.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(function (el) {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Sticky header shadow on scroll
var header = document.getElementById('header');
window.addEventListener('scroll', function () {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
  }
});