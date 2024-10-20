
// スライダー
const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    effect: "fade",

    // Speed of the transition animation (in milliseconds)
    speed: 1000,

    // Autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    },
});

// タップでも移り変わるように関数追加
function swiping() {
    swiper.slideNext();
}