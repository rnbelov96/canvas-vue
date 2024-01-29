const setVHValue = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVHValue();

window.addEventListener('resize', setVHValue);
