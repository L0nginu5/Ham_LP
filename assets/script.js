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






// 動画と要素の取得
const video = document.getElementById('intro-video');
const splash = document.getElementById('splash');
const content = document.getElementById('main-content');

// セッションストレージで動画再生情報を管理
const hasPlayedIntro = sessionStorage.getItem('hasPlayedIntro');


// 動画の終了イベントを監視して、スプラッシュを非表示にする
video.onended = () => {
    sessionStorage.setItem('hasPlayedIntro', 'true');
    showContent(); // 動画が終了したらコンテンツを表示
};

// コンテンツを表示する関数
function showContent() {
    splash.style.display = 'none'; // スプラッシュスクリーンを非表示
    content.style.display = 'block'; // メインコンテンツを表示
}









