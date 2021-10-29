const showCircle = function (cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';
      callback(div);
    }, 0);
};

showCircle(150,150,100, div => {
    div.classList.add('message-ball');
    div.append("안녕하세요!");
});