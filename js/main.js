document.addEventListener("DOMContentLoaded", function() {
    const fraction = document.querySelector(".hero-slider .swiper-fraction"),
          slides = document.querySelectorAll(".hero-slider .swiper-slide"),
          slideCount = slides.length;
    fraction.textContent = `01 - 0${slideCount}`;
    let heroSlider = new Swiper(".hero-slider", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next-unique",
            prevEl: ".swiper-button-prev-unique"
        },
        on: {
            slideChange: (swiper) => {
                fraction.textContent = `0${swiper.realIndex + 1} - 0${slideCount}`;
            }
        }
    })

    let worksSlider = new Swiper(".works-slider", {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 40,
        navigation: {
            nextEl: ".works-slider__btns .swiper-button-next-unique",
            prevEl: ".works-slider__btns .swiper-button-prev-unique"
        },
        breakpoints: {
            320: {
              slidesPerView: 1
            },
            426: {
              slidesPerView: 1.25
            },
            576: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            }
        }
    })

    let howBulletText = ['Подготовка', 'Организация', 'Проведение изысканий', 'Экспертиза'];
    let howSlider = new Swiper(".how-slider", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
            el: ".how__container .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return (
                    `<div class="${className}">${howBulletText[index]}
                        <span class="${className}-line"></span>
                    </div>`
                );
            }
        }
    })

    let tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            for (let sibling of e.target.parentNode.children) {
                sibling.classList.remove('tab--active');
            }
            for (let sibling of e.target.closest('.tabs-wrapper').parentNode.children) {
                if (sibling.classList.contains('tabs-container')) {
                    sibling.querySelectorAll('.tabs-content').forEach(content => {
                        content.classList.remove('tabs-content--active');
                    });
                }
            }
            e.target.classList.add('tab--active');
            document.querySelector(e.target.getAttribute('href')).classList.add('tabs-content--active');
        });
    });

    let accordeonItems = document.querySelectorAll('.accordeon__item');
    accordeonItems.forEach(accordeonItem => {
        accordeonItem.addEventListener("click", function() {
            this.classList.toggle("active");
        })
    })

    $('.input[type="tel"]').mask("+7 (999) 999 99 99", {
        autoclear: false,
        placeholder: "+7 (---) --- -- --"
    });

    let estimateFileInput = document.querySelector('.estimate-form__file-input');
    let estimateListFiles = document.querySelector('.estimate-form__file-list');
    const dt = new DataTransfer();
    estimateFileInput.addEventListener("change", function() {      
        for (let i = 0; i < this.files.length; i++) {
            estimateListFiles.innerHTML += 
                        `<li class=estimate-form__file-item>
                            <span>${this.files[i].name}</span>
                            <div class="estimate-form__file-delete">
                                <img src="img/delete-file.svg" alt="">
                            </div>
                        </li>`
            dt.items.add(this.files[i])    
        }
        this.files = dt.files;
    })

    
    estimateListFiles.addEventListener("click", function(e) {
        let targetItem = e.target
        if (targetItem.closest(".estimate-form__file-delete")) {
            let deleteFileName = targetItem.closest(".estimate-form__file-item").querySelector("span").innerText;
            for (let i = 0; i < estimateFileInput.files.length; i++) {   
                if (estimateFileInput.files[i].name == deleteFileName) {
                    dt.items.remove(i)
                    targetItem.closest(".estimate-form__file-item").remove();
                    break;
                }
            } 
        }
        estimateFileInput.files = dt.files;
    })

    let menuIcon = document.querySelector(".menu__icon");
    menuIcon.addEventListener("click", function() {
        this.classList.toggle("active");
        document.querySelector(".menu").classList.toggle("active");
        document.body.classList.toggle("no-scroll");
        document.querySelector(".header__container > .logo").classList.toggle("hidden");
        document.querySelector(".header__container > .phone").classList.toggle("hidden");
    }) 
})