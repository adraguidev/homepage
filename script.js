document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    const links = document.querySelectorAll('.navbar__item a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Scroll animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.querySelector('.navbar__contact');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
  
    contactButton.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('modal--visible');
    });
  
    closeModal.addEventListener('click', () => {
      modal.classList.remove('modal--visible');
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('modal--visible');
      }
    });
  });
  