// 2. 프라미스로 지연 만들기
function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
};

delay(3000).then(() => console.log("3초후 실행"));
// node에서는 alert를 실행할 수 없음!
// https://velog.io/@shitaikoto/Node.js-ReferenceError-alert-is-not-defined

// 3. 프라미스로 애니메이션이 적용된 원 만들기
const showCircle = function(cx, cy, radius) {
    return new Promise((resolve, reject) => {
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);
    setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
        resolve(div);
      }, 0);
    })
};