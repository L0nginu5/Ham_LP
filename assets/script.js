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



const root = document.documentElement;
let angle = 0; // 初期角度
let speed = .61*2; // 初期の回転速度

function animate() {
    if (angle < 360) { // 360度未満であればアニメーションを続行
        angle += speed; // 角度を速度に応じて増加
        root.style.setProperty('--angle', `${angle}deg`);
        requestAnimationFrame(animate); // 次のフレームで再度実行
    }
}

function setSpeed(newSpeed) {
    speed = newSpeed; // 回転速度を更新
}

animate(); // アニメーションを開始



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









