'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {//functionでcountUpを定義
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms =String(d.getUTCMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}:${ms}`;//${}=変数や式を突っ込む為の記号でテンプレートリテラルという

    timeoutId = setTimeout(() => {//一定時間で繰り返し
      countUp();
    }, 10);//10ミリ秒後にこのcountUP()自身を呼び出す
  }

  function setButtonStateInitial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');//disabled=無効化
    reset.classList.add('inactive');
  }

  function setButtonStateRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();


  start.addEventListener('click' , () => {//startをクリックした時に次の処理をしなさい
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();//現在時刻をstartTimeという名前で取得
    countUp();
  });

  stop.addEventListener('click' , () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click' , () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}