import 'reset-css';
import '../scss/base.scss';

(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let prevScene = 0;
  let currentScene = 0;
  let changeScene = false;
  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  const sceneInfo = [
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelectorAll('.scene')[0],
        message: [
          document
            .querySelectorAll('.scene')[0]
            .querySelectorAll('.item__sticky--text')[0],
          document
            .querySelectorAll('.scene')[0]
            .querySelectorAll('.item__sticky--text')[1],
          document
            .querySelectorAll('.scene')[0]
            .querySelectorAll('.item__sticky--text')[2],
          document
            .querySelectorAll('.scene')[0]
            .querySelectorAll('.item__sticky--text')[3],
        ],
        canvas: {
          el: document.querySelector('#bg-canvas-0'),
          context: document.querySelector('#bg-canvas-0').getContext('2d'),
          videoImages: [],
        },
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        message0_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        message0_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        message0_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        message0_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        message1_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        message1_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        message1_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        message1_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        message2_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        message2_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        message2_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        message2_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        message3_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        message3_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        message3_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        message3_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      type: 'normal',
      // heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelectorAll('.scene')[1],
      },
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelectorAll('.scene')[2],
        message: [
          document
            .querySelectorAll('.scene')[2]
            .querySelectorAll('.item__sticky--text')[0],
          document
            .querySelectorAll('.scene')[2]
            .querySelectorAll('.item__sticky--text')[1],
          document
            .querySelectorAll('.scene')[2]
            .querySelectorAll('.item__sticky--text')[2],
        ],
        canvas: {
          el: document.querySelector('#bg-canvas-1'),
          context: document.querySelector('#bg-canvas-1').getContext('2d'),
          videoImages: [],
        },
        pin: [
          document
            .querySelectorAll('.scene')[2]
            .querySelectorAll('.scene__pin')[0],
          document
            .querySelectorAll('.scene')[2]
            .querySelectorAll('.scene__pin')[1],
        ],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        pin0_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pin1_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
        message0_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
        message0_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        message0_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        message0_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        message1_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        message1_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        message1_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        message1_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        message2_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
        message2_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        message2_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
        message2_translateY_out: [0, -20, { start: 0.95, end: 1 }],
      },
    },
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelectorAll('.scene')[3],
        canvasCaption: document
          .querySelectorAll('.scene')[3]
          .querySelector('.scene__desc'),
        canvas: {
          el: document.querySelector('#img-blend-canvas'),
          context: document.querySelector('#img-blend-canvas').getContext('2d'),
        },
        blendImages: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
        rectStartY: 0,
      },
    },
  ];

  function setCanvasImages() {
    let imgEl;

    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgEl = new Image();
      imgEl.src = `./src/images/bg1/IMG_${6726 + i}.jpg`;
      sceneInfo[0].objs.canvas.videoImages.push(imgEl);
    }

    let imgEl2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgEl2 = new Image();
      imgEl2.src = `./src/images/bg2/IMG_${7027 + i}.jpg`;
      sceneInfo[2].objs.canvas.videoImages.push(imgEl2);
    }

    let imgEl3;
    for (let i = 0; i < 2; i++) {
      imgEl3 = new Image();
      imgEl3.src = `./src/images/blend-image-${i}.jpg`;
      sceneInfo[3].objs.blendImages.push(imgEl3);
    }
  }

  function setCanvasSize() {
    const heightRatio = window.innerHeight / 1080;

    sceneInfo[0].objs.canvas.el.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.el.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  function setLayout() {
    setScrollHeight();
    setCurrent();
    setCanvasSize();
  }

  function setScrollHeight() {
    sceneInfo.forEach((scene) => {
      if (scene.type === 'sticky') {
        scene.scrollHeight = scene.heightNum * window.innerHeight;
        scene.objs.container.style.height = `${scene.scrollHeight}px`;
      } else {
        scene.scrollHeight = scene.objs.container.offsetHeight;
      }
    });
  }

  function setCurrent() {
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;

      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        document
          .querySelectorAll('.scene')
          [currentScene].classList.add('scene--now');
        break;
      }
    }
  }

  function changeCurrent() {
    changeScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    prevScene = currentScene;

    if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      changeScene = true;
      currentScene++;
      document
        .querySelectorAll('.scene')
        [prevScene].classList.remove('scene--now');
      document
        .querySelectorAll('.scene')
        [currentScene].classList.add('scene--now');
    }

    if (delayedYOffset < prevScrollHeight) {
      changeScene = true;
      if (currentScene === 0) return;
      currentScene--;
      document
        .querySelectorAll('.scene')
        [prevScene].classList.remove('scene--now');
      document
        .querySelectorAll('.scene')
        [currentScene].classList.add('scene--now');
    }
  }

  function calcValue(values, currentYOffset) {
    let value;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    if (values.length === 3) {
      const framScrollStart = values[2].start * scrollHeight;
      const framScrollEnd = values[2].end * scrollHeight;
      const framHeight = framScrollEnd - framScrollStart;

      if (
        currentYOffset >= framScrollStart &&
        currentYOffset <= framScrollEnd
      ) {
        value =
          ((currentYOffset - framScrollStart) / framHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < framScrollStart) {
        value = values[0];
      } else if (currentYOffset > framScrollEnd) {
        value = values[1];
      }
    } else {
      value = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return value;
  }

  function playAni() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        //비디오 재생
        // let sequence = Math.round(
        //   calcValue(values.imageSequence, currentYOffset)
        // );
        // objs.canvas.context.drawImage(objs.canvas.videoImages[sequence], 0, 0);
        objs.canvas.el.style.opacity = calcValue(
          values.canvas_opacity,
          currentYOffset
        );

        if (scrollRatio <= 0.22) {
          objs.message[0].style.opacity = calcValue(
            values.message0_opacity_in,
            currentYOffset
          );
          objs.message[0].style.transform = `translate3d(0, ${calcValue(
            values.message0_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.message[0].style.opacity = calcValue(
            values.message0_opacity_out,
            currentYOffset
          );
          objs.message[0].style.transform = `translate3d(0, ${calcValue(
            values.message0_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          objs.message[1].style.opacity = calcValue(
            values.message1_opacity_in,
            currentYOffset
          );
          objs.message[1].style.transform = `translate3d(0, ${calcValue(
            values.message1_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.message[1].style.opacity = calcValue(
            values.message1_opacity_out,
            currentYOffset
          );
          objs.message[1].style.transform = `translate3d(0, ${calcValue(
            values.message1_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          objs.message[2].style.opacity = calcValue(
            values.message2_opacity_in,
            currentYOffset
          );
          objs.message[2].style.transform = `translate3d(0, ${calcValue(
            values.message2_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.message[2].style.opacity = calcValue(
            values.message2_opacity_out,
            currentYOffset
          );
          objs.message[2].style.transform = `translate3d(0, ${calcValue(
            values.message2_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          objs.message[3].style.opacity = calcValue(
            values.message3_opacity_in,
            currentYOffset
          );
          objs.message[3].style.transform = `translate3d(0, ${calcValue(
            values.message3_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.message[3].style.opacity = calcValue(
            values.message3_opacity_out,
            currentYOffset
          );
          objs.message[3].style.transform = `translate3d(0, ${calcValue(
            values.message3_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;

      case 2:
        // let sequence2 = Math.round(
        //   calcValue(values.imageSequence, currentYOffset)
        // );
        // objs.canvas.context.drawImage(objs.canvas.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          objs.canvas.el.style.opacity = calcValue(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          objs.canvas.el.style.opacity = calcValue(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio <= 0.32) {
          objs.message[0].style.opacity = calcValue(
            values.message0_opacity_in,
            currentYOffset
          );
          objs.message[0].style.transform = `translate3d(0, ${calcValue(
            values.message0_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.message[0].style.opacity = calcValue(
            values.message0_opacity_out,
            currentYOffset
          );
          objs.message[0].style.transform = `translate3d(0, ${calcValue(
            values.message0_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          objs.message[1].style.opacity = calcValue(
            values.message1_opacity_in,
            currentYOffset
          );
          objs.message[1].style.transform = `translate3d(0, ${calcValue(
            values.message1_translateY_in,
            currentYOffset
          )}%, 0)`;

          objs.pin[0].style.transform = `scaleY(${calcValue(
            values.pin0_scaleY,
            currentYOffset
          )})`;
        } else {
          objs.message[1].style.opacity = calcValue(
            values.message1_opacity_out,
            currentYOffset
          );
          objs.message[1].style.transform = `translate3d(0, ${calcValue(
            values.message1_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.93) {
          objs.message[2].style.opacity = calcValue(
            values.message2_opacity_in,
            currentYOffset
          );
          objs.message[2].style.transform = `translate3d(0, ${calcValue(
            values.message2_translateY_in,
            currentYOffset
          )}%, 0)`;

          objs.pin[1].style.transform = `scaleY(${calcValue(
            values.pin1_scaleY,
            currentYOffset
          )})`;
        } else {
          objs.message[2].style.opacity = calcValue(
            values.message2_opacity_out,
            currentYOffset
          );
          objs.message[2].style.transform = `translate3d(0, ${calcValue(
            values.message2_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        //currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
        if (scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.el.width;
          const heightRatio = window.innerHeight / objs.canvas.el.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            canvasScaleRatio = heightRatio;
          } else {
            canvasScaleRatio = widthRatio;
          }

          objs.canvas.el.style.transform = `scale(${canvasScaleRatio})`;
          objs.canvas.context.drawImage(objs.blendImages[0], 0, 0);
          objs.canvas.context.fillStyle = '#fff';

          const recalculatedInnerWidth =
            document.body.offsetWidth / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;

          values.rect1X[0] =
            (objs.canvas.el.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          objs.canvas.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.el.height
          );
          objs.canvas.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.el.height
          );
        }
        break;

      case 3:
        let step = 0;

        //가로/세로 모두 꽉 차게 하기 위해 여기서 세팅
        const widthRatio = window.innerWidth / objs.canvas.el.width;
        const heightRatio = window.innerHeight / objs.canvas.el.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          canvasScaleRatio = heightRatio;
        } else {
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.el.style.transform = `scale(${canvasScaleRatio})`;
        objs.canvas.context.drawImage(objs.blendImages[0], 0, 0);
        objs.canvas.context.fillStyle = '#fff';

        const recalculatedInnerWidth =
          document.body.offsetWidth / canvasScaleRatio;
        //const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        if (!values.rectStartY) {
          values.rectStartY =
            objs.canvas.el.offsetTop +
            (objs.canvas.el.height - objs.canvas.el.height * canvasScaleRatio) /
              2;

          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;

        values.rect1X[0] = (objs.canvas.el.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        objs.canvas.context.fillRect(
          parseInt(calcValue(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.el.height
        );
        objs.canvas.context.fillRect(
          parseInt(calcValue(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.el.height
        );

        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          objs.canvas.el.classList.remove('item__sticky');
        } else {
          step = 2;

          objs.canvas.el.classList.add('item__sticky');
          objs.canvas.el.style.top = `${
            -(
              objs.canvas.el.height -
              objs.canvas.el.height * canvasScaleRatio
            ) / 2
          }px`;

          // 이미지 블랜드
          values.blendHeight[1] = objs.canvas.el.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;

          const blendHeight = calcValue(values.blendHeight, currentYOffset);

          objs.canvas.context.drawImage(
            objs.blendImages[1],
            0,
            objs.canvas.el.height - blendHeight,
            objs.canvas.el.width,
            blendHeight,
            0,
            objs.canvas.el.height - blendHeight,
            objs.canvas.el.width,
            blendHeight
          );

          //canvas scale
          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] =
              document.body.offsetWidth / (1.5 * objs.canvas.el.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            objs.canvas.el.style.transform = `scale(${calcValue(
              values.canvas_scale,
              currentYOffset
            )})`;

            objs.canvas.el.style.marginTop = 0;
          }

          if (
            scrollRatio > values.canvas_scale[2].end &&
            values.canvas_scale[2].end > 0
          ) {
            objs.canvas.el.classList.remove('item__sticky');
            objs.canvas.el.style.marginTop = `${scrollHeight * 0.4}px`;

            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end =
              values.canvasCaption_opacity[2].start + 0.1;
            values.canvasCaption_translateY[2].start =
              values.canvas_scale[2].end;
            values.canvasCaption_translateY[2].end =
              values.canvasCaption_opacity[2].start + 0.1;

            objs.canvasCaption.style.opacity = calcValue(
              values.canvasCaption_opacity,
              currentYOffset
            );

            objs.canvasCaption.style.transform = `translate3d(0, ${calcValue(
              values.canvasCaption_translateY,
              currentYOffset
            )}%, 0)`;
          }
        }
        break;
    }
  }

  function checkMenu() {
    if (yOffset > 44) {
      document.querySelector('.header').classList.add('header--sticky');
    } else {
      document.querySelector('.header').classList.remove('header--sticky');
    }
  }

  function loop() {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!changeScene) {
      if (currentScene === 0 || currentScene === 2) {
        const currentYOffset = delayedYOffset - prevScrollHeight;
        const values = sceneInfo[currentScene].values;
        const objs = sceneInfo[currentScene].objs;

        let sequence = Math.round(
          calcValue(values.imageSequence, currentYOffset)
        );

        if (objs.canvas.videoImages[sequence]) {
          objs.canvas.context.drawImage(
            objs.canvas.videoImages[sequence],
            0,
            0
          );
        }
      }
    }

    rafId = requestAnimationFrame(loop);

    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }


  window.addEventListener('load', () => {
    document.body.classList.remove('before-load');

    setLayout();
    sceneInfo[0].objs.canvas.context.drawImage(
      sceneInfo[0].objs.canvas.videoImages[0],
      0,
      0
    );
    
    sceneInfo[2].objs.canvas.context.drawImage(
      sceneInfo[2].objs.canvas.videoImages[0],
      0,
      0
    );

    window.addEventListener('scroll', () => {
      yOffset = window.pageYOffset;
      changeCurrent();
      checkMenu();
      if (!changeScene) {
        playAni();
      }
  
      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) {
        setLayout();
        sceneInfo[3].values.rectStartY = 0;
      }
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(setLayout, 500);
    });

    document.querySelector('.loading').addEventListener('transitionend', (e) => {
      document.body.removeChild(e.currentTarget);
    });
  });

  setCanvasImages();
})();
