function initProjectModal() {
  console.log("Initializing project modal");

  // Configuration des images par projet
  const projectImages = {
    cavinum: ["cavinum_1.png", "cavinum_2.png", "cavinum_3.png"],
    vinyles: ["vinylesflow_1.png", "vinylesflow_2.png", "vinylesflow_3.png", "vinylesflow_4.png"],
    mentor: ["mentor1.png", "mentor2.png"]
  };

  let imagesList = [];
  let currentSlide = 0;

  // Éléments DOM
  const modal = document.getElementById('project-modal');

  // Vérifier si le modal existe
  if (!modal) {
    console.error("Modal not found!");
    return;
  }

  const imagesContainer = modal.querySelector('.carousel-images');
  const prevButton = modal.querySelector('.carousel-prev');
  const nextButton = modal.querySelector('.carousel-next');
  const closeButton = modal.querySelector('.close');

  // Vérifier que les éléments existent
  if (!imagesContainer || !prevButton || !nextButton || !closeButton) {
    console.error("One or more modal elements not found!");
    console.log({imagesContainer, prevButton, nextButton, closeButton});
    return;
  }

  // Fonction pour ouvrir le modal
  function openModal(projectKey) {
    console.log("Opening modal for project:", projectKey);

    if (!projectImages[projectKey]) {
      console.error("No images found for project:", projectKey);
      return;
    }

    // Réinitialiser
    imagesContainer.innerHTML = '';
    imagesList = projectImages[projectKey];
    currentSlide = 0;

    // Créer les éléments d'image
    imagesList.forEach((src, index) => {
      const imgPath = `/assets/${src}`;
      const imgElement = document.createElement('img');
      imgElement.src = imgPath;
      imgElement.className = index === 0 ? 'active' : '';
      imgElement.alt = `Image ${index + 1} de ${projectKey}`;
      imagesContainer.appendChild(imgElement);
    });

    // Afficher le modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page

    // Mettre à jour l'affichage du carousel
    updateCarousel();
  }

  // Fonction pour fermer le modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Réactive le défilement
  }

  // Fonction pour naviguer dans le carousel
  function navigate(direction) {
    currentSlide += direction;

    // Gérer la navigation circulaire
    if (currentSlide < 0) {
      currentSlide = imagesList.length - 1;
    } else if (currentSlide >= imagesList.length) {
      currentSlide = 0;
    }

    updateCarousel();
  }

  // Mettre à jour l'affichage du carousel
  function updateCarousel() {
    const images = imagesContainer.querySelectorAll('img');

    // Log pour le débogage
    console.log("Updating carousel. Current slide:", currentSlide);
    console.log("Number of images:", images.length);

    images.forEach((img, index) => {
      if (index === currentSlide) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  // Ajouter des écouteurs d'événements pour les projets
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function() {
      console.log("Project clicked:", this.dataset.project);
      const projectKey = this.dataset.project;
      openModal(projectKey);
    });
  });

  // Écouteurs d'événements pour les boutons de navigation
  prevButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Empêche la propagation de l'événement
    navigate(-1);
  });

  nextButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Empêche la propagation de l'événement
    navigate(1);
  });

  // Écouteur d'événement pour fermer le modal
  closeButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Empêche la propagation de l'événement
    closeModal();
  });

  // Fermer le modal en cliquant à l'extérieur
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Écouteurs pour les touches clavier
  document.addEventListener('keydown', (event) => {
    if (modal.style.display === 'block') {
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowLeft') {
        navigate(-1);
      } else if (event.key === 'ArrowRight') {
        navigate(1);
      }
    }
  });
}

// Initialiser lorsque le DOM est chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectModal);
} else {
  // Le DOM est déjà chargé
  initProjectModal();
}
