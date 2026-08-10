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
    images: ['img/robotics-1.jpg', 'img/robotics-2.jpg']
  },
  prosthetics: {
    tag: 'Humanitarian · 3D Printing',
    title: '3D-Printed Prosthetic Arms',
    desc: 'Designed and manufactured 20+ precision prosthetic arm components for underprivileged children via Helping Hands Miami Beach. Used PrusaSlicer and CAD to model custom-fit solutions for each recipient.',
    chips: ['3D Printing', 'PrusaSlicer', 'CAD', 'Assembly'],
    images: ['img/prosthetics-1.jpg', 'img/prosthetics-2.jpg']
  },
  plc: {
    tag: 'Industrial · Programming',
    title: 'PLC Motor Control System',
    desc: 'Programmed a PLC to power and control a 3-pole motor, developing ladder logic for startup, shutdown, and fault protection sequences using time delay and count up instructions.',
    chips: ['PLC', 'Ladder Logic', 'Automation', 'Electrical'],
    images: ['img/plc-1.jpg', 'img/plc-2.jpg']
  }
};

const overlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.project;
    const project = projects[key];
    if (!project) return;

    document.getElementById('modal-tag').textContent = project.tag;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.desc;

    const chipsEl = document.getElementById('modal-chips');
    chipsEl.innerHTML = project.chips.map(c =>
      `<span class="project-chip">${c}</span>`
    ).join('');

    const imagesEl = document.getElementById('modal-images');
    imagesEl.innerHTML = project.images.map(src =>
      `<img src="${src}" alt="${project.title}">`
    ).join('');

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
});

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}