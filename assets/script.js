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

document.addEventListener("DOMContentLoaded", function () {
    const fadeInElements = document.querySelectorAll(".fade-in");
    let lastScrollY = window.scrollY; // 前回のスクロール位置
    let hasAnimated = false; // アニメーションが初回のみ実行されたかを共通で管理
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const currentScrollY = window.scrollY;
  
          if (entry.isIntersecting && currentScrollY > lastScrollY) {
            // スクロール方向が下（上からのスクロール）の場合のみアニメーションを適用
            entry.target.classList.add("visible");
  
            // 初回のみ animate() を実行
            if (!hasAnimated) {
              animate(entry.target);
              hasAnimated = true; // フラグを設定し、一度だけ実行するようにする
            }
          } else if (!entry.isIntersecting && currentScrollY < lastScrollY) {
            // 上方向にスクロールして完全に画面から外れたときのみアニメーションを外す
            entry.target.classList.remove("visible");
          }
  
          // 現在のスクロール位置を保存
          lastScrollY = currentScrollY;
        });
      },
      {
        threshold: 0, // 要素が完全に画面外に出たときに検出
      }
    );
  

  
    // すべての要素を監視対象にする
    fadeInElements.forEach(element => {
      observer.observe(element);
    });
  
    // DOM変更の監視: 新しい要素が追加されたときに再度IntersectionObserverで監視
    const mutationObserver = new MutationObserver(() => {
      const newFadeInElements = document.querySelectorAll(".fade-in:not(.visible)");
      newFadeInElements.forEach(element => observer.observe(element));
    });
  
    // body内のDOM変更を監視
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  });
  
  function animate(element) {
    // アニメーション処理を定義する
    element.style.transform = "translateY(0)";
    element.style.opacity = "1";
}
  
  
  
  
  
  
  
  
  
  


function setScaledPath() {
    const screenWidth = window.innerWidth;
    const scaleFactor = screenWidth / 1000; // 基準幅1000pxに対する縮尺を設定

    // スケーリングされたパスを生成
    const scaledPath = `M 0 0 Q ${-30 * scaleFactor} ${-15 * scaleFactor}, 0 ${-30 * scaleFactor} T 0 ${-60 * scaleFactor} T 0 ${-90 * scaleFactor} T 0 ${-120 * scaleFactor}`;

    // パスをCSS変数として設定
    document.documentElement.style.setProperty('--scaled-path', `path('${scaledPath}')`);
}

// 初回のパス設定と、リサイズ時に再設定
setScaledPath();
window.addEventListener('resize', setScaledPath);



function setSpeed(newSpeed) {
    speed = newSpeed; // 回転速度を更新
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






// 動画と要素の取得
const video = document.getElementById('intro-video');
const splash = document.getElementById('splash');
const content = document.getElementById('main-content');
const skipButton = document.getElementById('skip-button'); // スキップボタンの取得

// セッションストレージで動画再生情報を管理
const hasPlayedIntro = sessionStorage.getItem('hasPlayedIntro');

// 動画の終了イベントを監視して、スプラッシュを非表示にする
video.onended = () => {
    sessionStorage.setItem('hasPlayedIntro', 'true');
    splash.classList.add('fade-out'); // フェードアウトアニメーションを追加
    content.style.display = 'block'; // メインコンテンツを表示

    // フェードアウトが完了したらメインコンテンツを表示
    setTimeout(showContent, 1000); // アニメーションの時間に合わせて500ms後に実行
};

// スキップボタンのクリックイベント
skipButton.onclick = () => {
    sessionStorage.setItem('hasPlayedIntro', 'true');
    splash.classList.add('fade-out'); // フェードアウトアニメーションを追加
    content.style.display = 'block'; // メインコンテンツを表示

    // フェードアウトが完了したらメインコンテンツを表示
    setTimeout(showContent, 1000); // アニメーションの時間に合わせて500ms後に実行
};

// コンテンツを表示する関数
function showContent() {
    splash.style.display = 'none'; // スプラッシュスクリーンを完全に非表示
    content.style.display = 'block'; // メインコンテンツを表示

    // 初期状態で最初の要素だけチェックし、visibleクラスを適用
    const fadeInElements = document.querySelectorAll(".fade-in");

    const firstElement = fadeInElements[0];
    if (firstElement && firstElement.getBoundingClientRect().top < window.innerHeight) {
        firstElement.classList.add("visible");
    
        // 初回のみ animate() を実行
        if (!hasAnimated) {
            animate(firstElement);
            hasAnimated = true; // フラグを設定し、一度だけ実行するようにする
        }
    }
}

// 初回表示時に動画を再生済みならスプラッシュをスキップ
// if (hasPlayedIntro) {
//     showContent();
// }



