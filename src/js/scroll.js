function scrollToSection() {
  function smoothScroll(targetEl, duration) {
    let target = document.querySelector(targetEl);
    if (!target) {
      console.log('елемент куди скролити не знайдено:', targetEl);
      return;
    }
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = window.pageYOffset;
    let startTime = null;
    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(
        timeElapsed,
        startPosition,
        targetPosition - 100,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }
  const refs = {
    menu: document.querySelector('.navigation-wrapper'),
    modal: document.querySelector('.modal'),
    body: document.querySelector('body'),
    wrapper: document.querySelector('.navigation-wrapper'),
  };
  function removeClass() {
    refs.menu.classList.remove('is-open');
    refs.modal.classList.remove('is-open-modal');
    refs.body.classList.remove('lock');
  }
  const links = document.querySelectorAll('a.scroll-to');
  if (links) {
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const currentTarget = this.getAttribute('href');
        console.log(refs.menu);
        if (refs.menu) {
          refs.menu.classList.contains('is-open') ? removeClass() : null;
        }
        smoothScroll(currentTarget, 1000);
      });
    });
  }
}
scrollToSection();
