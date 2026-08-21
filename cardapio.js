$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });
    
    


    ScrollReveal().reveal('#banner', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});


let buttons = document.querySelectorAll('.wave-button');

buttons.forEach((button) => {
    let isAnimating = false;
    let isOver = false;
  
    button.addEventListener('mouseover', function() {    
      if (isAnimating || isOver) {
        return;
      }
      
      isOver = true;
      isAnimating = true;
      const spans = this.querySelectorAll('span:not(.arrow)');

      spans.forEach((span, index) => {
          span.style.animation = '';
          void span.offsetWidth;
        
          span.style.animation = `waveEffect 0.5s forwards`;
        
        const duration = index * 0.015;
        span.style.animationDelay = `${duration}s`;
      });

      const totalDuration = spans.length * 15 + 500;
      setTimeout(() => {
          spans.forEach(span => span.style.animation = '');
          isAnimating = false;
      }, totalDuration);
  });
  
  button.addEventListener('mouseleave', function() {
        isOver = false;
    });
});
