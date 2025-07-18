// 🎯 Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Vérifier le localStorage
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Basculer le mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// 🚀 Filtrage des Projets
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 📩 Validation du Formulaire
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validation et envoi AJAX ici
    alert('Message envoyé avec succès !');
    contactForm.reset();
});

// 🚀 Smooth Scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Compense la navbar fixed
                behavior: 'smooth'
            });
        }
    });
});

// 🌟 Intersection Observer pour les animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-img, .about-text, .project-card, .skill-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(el => observer.observe(el));
};

// 🎯 Effet "Sticky" amélioré pour la navbar
const stickyNav = () => {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Hide/show navbar au scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;

        // Changement de style
        navbar.style.background = currentScroll > 50
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.9)';
        navbar.style.padding = currentScroll > 50
            ? '1rem 5%'
            : '1.8rem 5%';
    });
};

// 🛠 Initialisation
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    stickyNav();

    // Préload des images (améliore le fluidité)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) return;
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        });
    });
});
/**
 * Ouvre le client mail par défaut avec un message pré-rempli
 * @param {string} email - Email du destinataire (protégé anti-spam)
 * @param {string} subject - Sujet par défaut
 * @param {string} body - Corps du message par défaut
 */
function initEmailLink(emailElementId = 'email-link') {
  const emailLink = document.getElementById(emailElementId);
  
  if (!emailLink) return;

  emailLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Protection anti-spam (email découpé)
    const emailParts = [
      'keita.fode',
      '@',
      'ugb.edu.sn' // Corrigé (.sn au lieu de .sn.com)
    ];
    
    // Paramètres du message
    const emailParams = {
      to: emailParts.join(''),
      subject: 'Contact depuis votre portfolio',
      body: 'Bonjour Fodé,\n\nJe vous contacte à propos de...'
    };

    // Construction du lien mailto sécurisé
    const mailtoUrl = `mailto:${emailParams.to}?subject=${
      encodeURIComponent(emailParams.subject)
    }&body=${
      encodeURIComponent(emailParams.body)
    }`;

    // Ouverture compatible avec tous les navigateurs
    openMailClient(mailtoUrl);
  });
}

/**
 * Méthode d'ouverture cross-browser
 */
function openMailClient(url) {
  // Essai d'ouverture dans un nouvel onglet
  const mailWindow = window.open(url, '_blank');
  
  // Fallback si bloqué par le navigateur
  if (!mailWindow || mailWindow.closed) {
    const hiddenLink = document.createElement('a');
    hiddenLink.href = url;
    hiddenLink.style.display = 'none';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);
  }
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  initEmailLink(); // ID par défaut 'email-link'
});
