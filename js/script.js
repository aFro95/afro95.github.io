window.addEventListener('load', function() {
    if (document.body.classList.contains('fullscreen') && window.innerWidth > 1024){
        const sections = document.querySelectorAll('.first-page, .about, .portfolio, .contact');
        const content = document.querySelector('.first-page');
        let spin_value = 0;
        let can_scroll = true;
        sec_nav = '';
        document.body.insertAdjacentHTML('beforeEnd', '<div class="section_navigation"></div>');
        for ( let i=0; i<sections.length; i++ ) {
            sec_nav += '<div class="sec_button"><span>'+ sections[i].id +'</span></div>';
        }
        document.querySelector('.section_navigation').innerHTML = sec_nav;
        const buttons = document.querySelectorAll('.sec_button');
        buttons[0].classList.add('active');
        for ( let i=0; i<buttons.length; i++ ) {
            buttons[i].addEventListener('click', function() {
                document.querySelector('.sec_button.active').classList.remove('active');
                this.classList.add('active');
                spin_value = i;
                scroll_content(spin_value);
            });
        }
        window.addEventListener('mousewheel', function(e) {
            if ( can_scroll ) {
                can_scroll = false;
                if ( e.deltaY > 0 ) {
                    // scroll down
                    if ( spin_value < sections.length-1 ) spin_value += 1;
                } else {
                    // scroll up
                    if ( spin_value > 0 ) spin_value -= 1;
                }
                scroll_content(spin_value);
            }
            setTimeout(function() {
                can_scroll = true;
            }, 560);
        });
        function scroll_content( count ) {
            const section = sections[count];
            const offsetTop = section.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            document.querySelector('.sec_button.active').classList.remove('active');
            buttons[count].classList.add('active');
        }
    }
});



const cursor_circle = document.querySelector(".cursor-circle"), 
cursor = document.querySelectorAll(".cursor"),
elements = document.querySelectorAll(".getHover"),
image_wrap = document.querySelector(".image-wrap");

let timeline = gsap.timeline({defaults: { duration: 1.3, ease: "power3.inOut"},});

timeline.to(".image-wrap", {
    height: "550px",
    backgroundSize: "105%",
    duration: 1.5,
    ease: "power4.inOut",
}).to (
    ".image-wrap", 
    {
        height: 250,
        backgroundPosition: "50% 31%",
        y: "0",
    }, 1.5)
    .from(
    ".big-name", 
    {
        y: getYDistance(".big-name"),
    }, 1.5)
    .from (".hide", 
    {
        opacity: "0",
    }, 1.5);

function getYDistance (el) {
    return (window.innerHeight - document.querySelector(el).getBoundingClientRect().top);
}

window.addEventListener("mousemove", (e) => {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    cursor.forEach((el) => {
        el.style.transform = `translate(calc(-50% + ${xPosition}px), calc(-50% + ${yPosition}px))`;
        el.style.opacity = "1";
    })
});

elements.forEach (el => {
    el.addEventListener("mouseover", () => {
        cursor_circle.classList.add("biggerCursor");
    });
    el.addEventListener("mouseout", () => {
        cursor_circle.classList.remove("biggerCursor");
    });
});

image_wrap.addEventListener("mousemove", (e) => {
    let rect = image_wrap.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

    let xSpeed = 0.008,
    ySpeed = 0.02;

    let xMoving = x - image_wrap.clientWidth / 2;
    let yMoving = y - image_wrap.clientHeight / 2;

    image_wrap.style.backgroundPosition = `calc(50% + ${xMoving * xSpeed}px) calc(31% + ${yMoving * ySpeed}px)`
});

image_wrap.addEventListener("mouseover", () => {
    image_wrap.style.transition = ".2s background-position";
    setTimeout(() => {
        image_wrap.style.transition = "0s background-position";
    }, 200);
});

image_wrap.addEventListener("mouseout", () => {
    image_wrap.style.transition = ".5s background-position";
    image_wrap.style.backgroundPosition = "50% 31%";
});

setTimeout(() => {
    image_wrap.style.pointerEvents = "auto";
}, timeline.endTime() * 1000);


var slideIds = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6'];
var currentSlide = 0;

function changeSlide(direction) {
    document.getElementById(slideIds[currentSlide]).style.display = 'none';
    
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slideIds.length - 1;
    if (currentSlide >= slideIds.length) currentSlide = 0;
    
    document.getElementById(slideIds[currentSlide]).style.display = 'block';
}