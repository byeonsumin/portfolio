
// ================= 호버 시 화이트 이미지로 변경
const hoverImages = document.querySelectorAll('.hover_img');
hoverImages.forEach(img => {
    const parent = img.parentElement;
    parent.addEventListener('mouseenter', () => { img.src = img.dataset.hover; });
    parent.addEventListener('mouseleave', () => { img.src = img.dataset.original; });
});

// ================= 전체화면 스크롤 Swiper
const swiper = new Swiper('.mainSwiper', {
    direction: 'vertical', 
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    speed: 800,
    on: {
        slideChangeTransitionEnd: function () {
            for(let i of nav) i.classList.remove('active');
            nav[this.activeIndex].classList.add('active');
            setTimeout(() => { ScrollTrigger.refresh(); }, 0);
        }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: false, // 클릭 비활성화
    },
});

// ================= 섹션별 네비
const navBar = document.querySelector('nav');
const navItems = navBar.children;

navItems[0].addEventListener('click', e => { e.preventDefault(); swiper.slideTo(0, 1000); updateActiveNav(0); });
navItems[1].addEventListener('click', e => { e.preventDefault(); swiper.slideTo(1, 1000); updateActiveNav(1); });
navItems[2].addEventListener('click', e => { e.preventDefault(); swiper.slideTo(2, 1000); updateActiveNav(2); });
navItems[3].addEventListener('click', e => { e.preventDefault(); swiper.slideTo(3, 1000); updateActiveNav(3); });
navItems[4].addEventListener('click', e => { e.preventDefault(); swiper.slideTo(7, 1000); updateActiveNav(4); });

function updateActiveNav(index) {
    for(let i = 0; i < navItems.length; i++) {
        navItems[i].classList.toggle('active', i === index);
    }
}

swiper.on('slideChange', () => {
    const slideIndex = swiper.realIndex;
    const navRanges = [[0],[1],[2],[3,4,5,6],[7]];
    navRanges.forEach((range, idx) => {
        navItems[idx].classList.toggle('active', range.includes(slideIndex));
    });
});

// ================= 그래픽 디자인 Swiper
const banner = new Swiper('.design1', { autoplay:{delay:0}, loop:true, speed:4000, slidesPerView:3, spaceBetween:10 });
const sns    = new Swiper('.design2', { autoplay:{delay:0}, loop:true, speed:6000, slidesPerView:3, spaceBetween:10 });
const longImg = new Swiper('.design3', { effect:'fade', loop:true, direction:'horizontal', autoplay:{delay:2000}, pagination:{el:'.swiper-pagination'} });
// ================= 그래픽 디자인 팝업
const bannerProject = document.querySelectorAll('.grp_contents .banner img');
const designProject = document.querySelectorAll('.grp_contents .snsDetail img');
const popup_bg = document.querySelector('.popup_bg');
popup_bg.style.display = 'none'; // 팝업 숨기기

function disableScroll() { swiper.mousewheel.disable(); }
function enableScroll() { swiper.mousewheel.enable(); }

bannerProject.forEach(img => {
    img.addEventListener('click', () => {
        popup_bg.style.display = 'block';
        popup_bg.children[0].style.marginTop = '300px';
        popup_bg.children[0].style.width = '1000px';
        popup_bg.children[0].style.height = 'max-content';
        popup_bg.children[0].children[0].src = img.src;
        disableScroll();
    });
});

designProject.forEach(img => {
    img.addEventListener('click', () => {
        popup_bg.style.display = 'block';
        popup_bg.children[0].scrollTo(0,0);
        popup_bg.children[0].style.marginTop = '80px';
        popup_bg.children[0].style.width = '800px';
        popup_bg.children[0].style.height = '810px';
        popup_bg.children[0].children[0].src = img.src;
        disableScroll();
    });
});

// 팝업 배경 클릭 시 닫기
popup_bg.addEventListener('click', e => {
    if(e.target === popup_bg) {
        popup_bg.style.display = 'none';
        enableScroll();
    }
});

// 팝업 이미지 클릭 시 닫기
popup_bg.children[0].children[0].addEventListener('click', () => {
    popup_bg.style.display = 'none';
    enableScroll();
});

// ================= 목차 애니메이션 반복
const projects = document.querySelectorAll("main .contents .table .project");
const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.style.transitionDelay = `${index * 0.3}s`;
        } else {
            entry.target.classList.remove("show");
        }
    });
},{ threshold: 0.3 });
projects.forEach(project => observer1.observe(project));

// ================= 목업사진 애니메이션 반복 & 첫장 타이틀 애니메이션
document.addEventListener("DOMContentLoaded", () => {
    const mokups = document.querySelectorAll('.bg_right_mokup, .bg_left_mokup');
    mokups.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
    });
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if(entry.isIntersecting) {
                setTimeout(() => {
                    el.style.transition = "opacity 1s ease, transform 0.8s ease";
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, 300);
            } else {
                el.style.opacity = "0";
                el.style.transform = "translateY(50px)";
            }
        });
    }, { threshold: 0.1 });
    mokups.forEach(el => observer2.observe(el));

    const titles = document.querySelectorAll('.main_section .main_text h1, .main_section .main_text h2, .main_section .main_text .span_group span');
    titles.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
    });
    const observer3 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if(entry.isIntersecting) {
                if(el.matches('.span_group span')) {
                    setTimeout(() => {
                        el.style.transition = "opacity 1.5s ease, transform 1.5s ease";
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                    }, 500);
                } else {
                    el.style.transition = "opacity 1.5s ease, transform 1.5s ease";
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }
            } else {
                el.style.opacity = "0";
                el.style.transform = "translateY(30px)";
            }
        });
    }, { threshold: 0.1 });
    titles.forEach(el => observer3.observe(el));
});

