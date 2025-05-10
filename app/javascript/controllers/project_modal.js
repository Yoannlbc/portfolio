function initProjectModal() {
  console.log("Initializing project modal");

  // Configuration des médias (images ou vidéos) par projet
  const projectMedia = {
    cavinum: [
      { type: 'image', src: 'cavinum_1.png' },
      { type: 'image', src: 'cavinum_2.png' },
      { type: 'image', src: 'cavinum_3.png' },
      { type: 'video', src: 'https://www.youtube.com/embed/YBOQmIEBFjY?si=-zOFGeyxt7ic4_bo' }
    ],
    vinyles: [
      { type: 'image', src: 'vinylesflow_1.png' },
      { type: 'image', src: 'vinylesflow_2.png' },
      { type: 'image', src: 'vinylesflow_3.png' },
      { type: 'image', src: 'vinylesflow_4.png' }
    ],
    mentor: [
      { type: 'image', src: 'senior_mentor_1.png' },
      { type: 'image', src: 'senior_mentor_2.png' },
      { type: 'image', src: 'senior_mentor_3.png' },
      { type: 'image', src: 'senior_mentor_5.png' }
    ]
  };

  let mediaList = [];
  let currentSlide = 0;

  // Éléments DOM
  const modal = document.getElementById('project-modal');

  if (!modal) {
    console.error("Modal not found!");
    return;
  }

  const imagesContainer = modal.querySelector('.carousel-images');
  const prevButton = modal.querySelector('.carousel-prev');
  const nextButton = modal.querySelector('.carousel-next');
  const closeButton = modal.querySelector('.close');

  if (!imagesContainer || !prevButton || !nextButton || !closeButton) {
    console.error("One or more modal elements not found!");
    return;
  }

  function openModal(projectKey) {
    console.log("Opening modal for project:", projectKey);

    if (!projectMedia[projectKey]) {
      console.error("No media found for project:", projectKey);
      return;
    }

    imagesContainer.innerHTML = '';
    mediaList = projectMedia[projectKey];
    currentSlide = 0;

    // Crée les éléments (images ou iframes vidéo)
    mediaList.forEach((media, index) => {
      let element;

      if (media.type === 'image') {
        element = document.createElement('img');
        element.src = `/assets/${media.src}`;
        element.alt = `Image ${index + 1} de ${projectKey}`;
      } else if (media.type === 'video') {
        element = document.createElement('iframe');
        element.src = media.src;
        element.width = "560";
        element.height = "315";
        element.title = "Vidéo du projet";
        element.frameBorder = "0";
        element.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        element.allowFullscreen = true;
      }

      element.className = index === 0 ? 'active' : '';
      imagesContainer.appendChild(element);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    updateCarousel();
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function navigate(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
      currentSlide = mediaList.length - 1;
    } else if (currentSlide >= mediaList.length) {
      currentSlide = 0;
    }

    updateCarousel();
  }

  function updateCarousel() {
    const items = imagesContainer.children;

    Array.from(items).forEach((item, index) => {
      if (index === currentSlide) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function () {
      const projectKey = this.dataset.project;
      openModal(projectKey);
    });
  });

  prevButton.addEventListener('click', function (e) {
    e.stopPropagation();
    navigate(-1);
  });

  nextButton.addEventListener('click', function (e) {
    e.stopPropagation();
    navigate(1);
  });

  closeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjectModal);
} else {
  initProjectModal();
}
