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
  const content = document.getElementById("main-content");

  // MutationObserverを使って`content`の表示スタイルを監視
  const displayObserver = new MutationObserver(() => {
    if (getComputedStyle(content).display === "block") {
      // `content`が`block`になったら監視を停止し、処理を実行
      displayObserver.disconnect();

      const fadeInElements = document.querySelectorAll(".fade-in");
      let lastScrollY = window.scrollY;
      let hasAnimated = false;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const currentScrollY = window.scrollY;
            if (entry.isIntersecting && currentScrollY > lastScrollY) {
              entry.target.classList.add("visible");
              if (!hasAnimated) {
                animate(entry.target);
                hasAnimated = true;
              }
            } else if (!entry.isIntersecting && currentScrollY < lastScrollY) {
              // entry.target.classList.remove("visible");
            }
            lastScrollY = currentScrollY;
          });
        },
        { threshold: 0 }
      );

      // すべての.fade-in要素を監視対象にする
      fadeInElements.forEach(element => {
        observer.observe(element);
        if (element.getBoundingClientRect().top < window.innerHeight) {
          element.classList.add("visible");
          animate(element);
        }
      });

      // DOM変更の監視: 新しい.fade-in要素が追加されたときに再度IntersectionObserverで監視
      const mutationObserver = new MutationObserver(() => {
        const newFadeInElements = document.querySelectorAll(".fade-in:not(.visible)");
        newFadeInElements.forEach(element => observer.observe(element));
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });

  // `content`要素のスタイル変更を監視
  displayObserver.observe(content, {
    attributes: true,
    attributeFilter: ["style"]
  });
});


function animate(element) {
  // アニメーション処理を定義する
  element.style.transform = "translateY(0)";
  element.style.opacity = "1";
}
function animate() {
  if (angle < 360) { // 360度未満であればアニメーションを続行
    angle += speed; // 角度を速度に応じて増加
    root.style.setProperty('--angle', `${angle}deg`);
    requestAnimationFrame(animate); // 次のフレームで再度実行
  }
}

// スプラッシュ
document.addEventListener('DOMContentLoaded', function () {
  // ロゴ要素を取得
  var logo = document.getElementById('splash-logo');
  const content = document.getElementById('main-content');
  var splashScreen = document.getElementById('splash-screen');

  // トランジション終了を検知
  logo.addEventListener('transitionend', function (event) {
    if (event.propertyName === 'filter') {
      // フィルタのトランジションが完了したら、不透明度を徐々に上げる
      logo.style.transition = 'opacity 1s ease';
      logo.style.opacity = '0';
    } else if (event.propertyName === 'opacity') {
      // 不透明度のトランジションが完了したら、スプラッシュ画面を非表示にしてメインコンテンツを表示
      splashScreen.style.display = 'none';
      content.style.display = 'block'; // メインコンテンツを表示
    }
  });

  // 一定時間後に彩度を上げる
  setTimeout(function () {
    logo.style.filter = 'saturate(1)';
  }, 1000);
});



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
let speed = .61 * 2; // 初期の回転速度





// 動画と要素の取得
// const video = document.getElementById('intro-video');
// const splash = document.getElementById('splash');
// const skipButton = document.getElementById('skip-button'); // スキップボタンの取得

// セッションストレージで動画再生情報を管理
// const hasPlayedIntro = sessionStorage.getItem('hasPlayedIntro');

// // 動画の終了イベントを監視して、スプラッシュを非表示にする
// video.onended = () => {
//     sessionStorage.setItem('hasPlayedIntro', 'true');
//     splash.classList.add('fade-out'); // フェードアウトアニメーションを追加
//     content.style.display = 'block'; // メインコンテンツを表示

//     // フェードアウトが完了したらメインコンテンツを表示
//     setTimeout(showContent, 1000); // アニメーションの時間に合わせて500ms後に実行
// };

// // スキップボタンのクリックイベント
// skipButton.onclick = () => {
//     sessionStorage.setItem('hasPlayedIntro', 'true');
//     splash.classList.add('fade-out'); // フェードアウトアニメーションを追加
//     content.style.display = 'block'; // メインコンテンツを表示

//     // フェードアウトが完了したらメインコンテンツを表示
//     setTimeout(showContent, 1000); // アニメーションの時間に合わせて500ms後に実行
// };

// // コンテンツを表示する関数
// function showContent() {
//     splash.style.display = 'none'; // スプラッシュスクリーンを完全に非表示
//     content.style.display = 'block'; // メインコンテンツを表示

//     // 初期状態で最初の要素だけチェックし、visibleクラスを適用
//     const fadeInElements = document.querySelectorAll(".fade-in");

//     const firstElement = fadeInElements[0];
//     if (firstElement && firstElement.getBoundingClientRect().top < window.innerHeight) {
//         firstElement.classList.add("visible");

//         // 初回のみ animate() を実行
//         if (!hasAnimated) {
//             animate(firstElement);
//             hasAnimated = true; // フラグを設定し、一度だけ実行するようにする
//         }
//     }
// }

// // 初回表示時に動画を再生済みならスプラッシュをスキップ
// // if (hasPlayedIntro) {
// //     showContent();
// // }