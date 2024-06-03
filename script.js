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
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('datos.json')
      .then(response => response.json())
      .then(data => {
        // Perfil
        document.querySelector('.status').textContent = data.profile.status;
        document.querySelector('.name').textContent = data.profile.name;
        document.querySelector('.title').textContent = data.profile.title;
        document.querySelector('.button[href^="mailto"]').href = `${data.profile.email}`;
        document.querySelector('.button--secondary').href = data.profile.cv;
        document.querySelector('.profile-image img').src = data.profile.image;
        document.querySelector('.profile-text').textContent = data.profile.description;
  
        // Experiencia
        const experienceContainer = document.querySelector('.experience-timeline');
        experienceContainer.innerHTML = '';
        data.experience.forEach(item => {
          const experienceItem = document.createElement('div');
          experienceItem.className = 'experience-item';
          experienceItem.innerHTML = `
            <div class="experience-details">
              <h4 class="experience-role">${item.role}</h4>
              <p class="experience-company">${item.company}</p>
              <p class="experience-location">
                <svg class="experience-location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                </svg>
                ${item.location}
              </p>
              <p class="experience-description">${item.description}</p>
            </div>
            <div class="experience-date">
              <svg class="experience-date-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path>
              </svg>
              ${item.date}
            </div>
          `;
          experienceContainer.appendChild(experienceItem);
        });
  
        // Educación
        const educationContainer = document.querySelector('.education-timeline');
        educationContainer.innerHTML = '';
        data.education.forEach(item => {
          const educationItem = document.createElement('div');
          educationItem.className = 'education-item';
          educationItem.innerHTML = `
            <div class="education-details">
              <h4 class="education-school">${item.school}</h4>
              <p class="education-degree">${item.degree}</p>
            </div>
            <div class="education-date">
              <svg class="experience-date-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"></path>
              </svg>
              ${item.date}
            </div>
          `;
          educationContainer.appendChild(educationItem);
        });
  
        // Habilidades
        const skillsContainer = document.querySelector('.skills-container');
        skillsContainer.innerHTML = ''; // Vacía el contenedor antes de agregar contenido
        for (const category in data.skills) {
          const skillsSection = document.createElement('div');
          skillsSection.className = 'skills-section';
          skillsSection.innerHTML = `
            <h4 class="skills-category">${category}</h4>
            <div class="skills-list"></div>
          `;
          const skillsList = skillsSection.querySelector('.skills-list');
          data.skills[category].forEach(skill => {
            const skillItem = document.createElement('span');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
              <svg class="skill-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 19L2 12l1.5-1.5L9 16.17 20.5 4.67 22 6l-13 13z"></path>
              </svg>
              ${skill}
            `;
            skillsList.appendChild(skillItem);
          });
          skillsContainer.appendChild(skillsSection);
        }
  
        // Idiomas
        const languagesContainer = document.querySelector('.languages-list');
        languagesContainer.innerHTML = '';
        data.languages.forEach(language => {
          const languageItem = document.createElement('div');
          languageItem.className = 'language-item';
          languageItem.innerHTML = `
            <span class="language-flag">${language.flag}</span>
            <div class="language-info">
              <span class="language-name">${language.name}</span>
              <span class="language-proficiency">${language.proficiency}</span>
            </div>
          `;
          languagesContainer.appendChild(languageItem);
        });
      })
      .catch(error => console.error('Error loading data:', error));
  });
  