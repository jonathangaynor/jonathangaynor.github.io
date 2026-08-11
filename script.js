const projects = {
  catheter: {
    tag: 'Medical Device · Prototype',
    title: 'Low-Cost Catheter Machine',
    desc: 'Designed and prototyped a catheter device reducing manufacturing cost from over $1,000 to less than $25. Integrated load-based measurement, thermal monitoring, and timing systems for clinical reliability. The goal was to make catheter production accessible for low-resource medical settings without sacrificing precision or safety.',
    chips: ['Wiring', 'Prototyping', 'Sensors', 'Thermal Systems'],
    images: ['img/catheter-1.jpg', 'img/catheter-2.jpg']
  },
  robotics: {
    tag: 'Robotics · Fabrication',
    title: 'Robotic Arm & Autonomous Car',
    desc: 'Built a fully functional robotic arm and autonomous car from scratch at Penn State. Designed all mechanical linkages, programmed motion control systems, and fabricated every component.',
    chips: ['Robotics', 'CAD', 'Programming', 'Fabrication'],
    images: ['img/robotics-1.jpg', 'img/robotics-2.jpg', 'img/robotics-3.jpg', 'img/robotics-4.jpg', 'img/robotics-5.jpg', 'img/robotics-6.jpg']
  },
  prosthetics: {
    tag: 'Humanitarian · 3D Printing',
    title: '3D-Printed Prosthetic Arms',
    desc: 'Designed and manufactured 20+ precision prosthetic arm components for underprivileged children via Helping Hands Miami Beach. Used PrusaSlicer and CAD to model custom-fit solutions for each recipient.',
    chips: ['3D Printing', 'PrusaSlicer', 'CAD', 'Assembly'],
    images: ['img/prosthetics-1.jpg', 'img/prosthetics-2.jpg', 'img/prosthetics-3.jpg', 'img/prosthetics-4.jpg', 'img/prosthetics-5.jpg', 'img/prosthetics-6.jpg', 'img/prosthetics-7.jpg']
  },
  plc: {
    tag: 'Industrial · Programming',
    title: 'PLC Motor Control System',
    desc: 'Programmed a PLC to power and control a 3-pole motor at Penn State. Developed ladder logic for motor startup, shutdown, and fault protection sequences using time delay and count up instructions.',
    chips: ['PLC', 'Ladder Logic', 'Automation', 'Electrical'],
    images: ['img/plc-1.jpg', 'img/plc-2.jpg', 'img/plc-3.jpg', 'img/plc-4.jpg', 'img/plc-5.jpg']
  },

  adder: {
    tag: 'Digital Logic · Academic',
    title: '4-Bit Binary Adder',
    desc: 'Designed and built a 4-bit binary adder circuit from scratch using logic gates. The circuit performs binary addition on two 4-bit inputs and outputs a 4-bit sum with a carry bit. Implemented using fundamental AND, OR, and XOR gates to construct half adders and full adders, demonstrating core digital electronics principles underlying modern computing and embedded systems.',
    chips: ['Digital Logic', 'Circuit Design', 'Boolean Algebra', 'Electronics'],
    images: ['img/adder-1.jpg']
  },

  wireless: {
    tag: 'Electronics · In Progress',
    title: 'Wireless Audio Transmitter',
    desc: 'Designing a self-contained wireless audio device that plugs directly into a guitar or piano\'s 1/4" TS jack and transmits audio via Bluetooth to headphones — completely cable-free. Built around a KCX_BT_EMITTER Bluetooth module, TL072CP op-amp buffer, LiPo battery with TP4056 charge module, and MT3608 boost converter. Currently in prototyping phase.',
    chips: ['Electronics', 'Bluetooth', 'PCB Design', 'LiPo'],
    images: ['img/wireless-1.jpg']
  }
};

// SLIDESHOW STATE
let currentSlide = 0;
let currentImages = [];

function buildSlideshow(images, title) {
  const imagesEl = document.getElementById('modal-images');
  imagesEl.innerHTML = '';

  // Only show arrows if more than one image
  if (images.length > 1) {
    imagesEl.innerHTML += `
      <button class="slide-btn slide-prev" id="slide-prev">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="slide-btn slide-next" id="slide-next">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <div class="slide-dots" id="slide-dots"></div>
    `;
  }

  // Add images
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    if (i === 0) img.classList.add('active');
    imagesEl.appendChild(img);
  });

  // Add dots
  if (images.length > 1) {
    const dotsEl = document.getElementById('slide-dots');
    images.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slide-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(dot);
    });

    document.getElementById('slide-prev').addEventListener('click', e => {
      e.stopPropagation();
      goToSlide(currentSlide === 0 ? currentImages.length - 1 : currentSlide - 1);
    });

    document.getElementById('slide-next').addEventListener('click', e => {
      e.stopPropagation();
      goToSlide(currentSlide === currentImages.length - 1 ? 0 : currentSlide + 1);
    });
  }
}

function goToSlide(index) {
  const imagesEl = document.getElementById('modal-images');
  const imgs = imagesEl.querySelectorAll('img');
  const dots = imagesEl.querySelectorAll('.slide-dot');

  imgs[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = index;

  imgs[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

// SWIPE SUPPORT
let touchStartX = 0;
document.getElementById('modal-images').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
document.getElementById('modal-images').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      goToSlide(currentSlide === currentImages.length - 1 ? 0 : currentSlide + 1);
    } else {
      goToSlide(currentSlide === 0 ? currentImages.length - 1 : currentSlide - 1);
    }
  }
});

// MODAL LOGIC
const overlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.project;
    const project = projects[key];
    if (!project) return;

    currentSlide = 0;
    currentImages = project.images;

    document.getElementById('modal-tag').textContent = project.tag;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.desc;

    const chipsEl = document.getElementById('modal-chips');
    chipsEl.innerHTML = project.chips.map(c =>
      `<span class="project-chip">${c}</span>`
    ).join('');

    buildSlideshow(project.images, project.title);

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') goToSlide(currentSlide === currentImages.length - 1 ? 0 : currentSlide + 1);
  if (e.key === 'ArrowLeft') goToSlide(currentSlide === 0 ? currentImages.length - 1 : currentSlide - 1);
});

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}