// 動画と要素の取得
const video = document.getElementById('intro-video');
const splash = document.getElementById('splash');
const content = document.getElementById('main-content');

// セッションストレージで動画再生情報を管理
const hasPlayedIntro = sessionStorage.getItem('hasPlayedIntro');

// 画像の読み込みを確認する関数
function checkImagesLoaded() {
    const images = document.querySelectorAll('img');
    let loadedImagesCount = 0;

    return new Promise((resolve) => {
        images.forEach((img) => {
            if (img.complete) {
                loadedImagesCount++; // 画像が既にロード済みの場合
            } else {
                // 画像がロード完了したときのイベント
                img.addEventListener('load', () => {
                    loadedImagesCount++;
                    if (loadedImagesCount === images.length) {
                        resolve(); // すべての画像がロードされたらPromiseを解決
                    }
                });
            }
        });

        console.log(loadedImagesCount)

        // すべての画像が既にロードされている場合は即座にPromiseを解決
        if (loadedImagesCount === images.length) {
            resolve();
        }
    });
}

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



// 画像のロードが完了したら動画を再生
checkImagesLoaded().then(() => {
    if (!hasPlayedIntro) {
        video.play(); // 画像がロードされた後に動画を再生
    } else {
        showContent(); // 動画をスキップし、直接コンテンツを表示
    }
});

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





