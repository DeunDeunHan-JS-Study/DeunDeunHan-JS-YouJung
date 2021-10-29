//아래와 같은 코드는 체이닝이 아니다
let promise = new Promise((resolve, reject) => {
    setTimeout(resolve(1), 2000)
});

promise.then(resolve => console.log(resolve))
promise.then(resolve => console.log(resolve+1))
//이렇게 코드를 작성할 경우, 연쇄적으로 체이닝이 일어나는 것이 아니라 여러개의 then이 동시에 실행될 뿐이다.


//여러개의 promise를 반환할 수도 있다.
const step1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1),1000);
});

const step2 = function(ex_step) {
    return new Promise((resolve, reject) => {
        console.log(ex_step)
        setTimeout(resolve(ex_step * 2), 1000);
    })
}
step1
    .then(result => step2(result))
    .then(result => console.log(result));

//thenable을 반환하는 경우
class Thenable {
    constructor(num) {
        this.num = num;
    };
    then(resolve, reject) {
        console.log(resolve);
        setTimeout(()=> resolve(this.num * 2), 1000);
    };
};

new Promise(resolve => resolve(1))
    .then(result => {
        return new Thenable(result);
    })
    .then(console.log);

// 과제
promise.then(f1).catch(f2);
// => promise 체인 과정에서 에러가 난 경우 f2

promise.then(f1, f2)
// => promise가 fulfill된 경우 f1, 에러가 난 경우 f2
// 그러나 체인 과정에서 에러가 난 경우에는 에러 처리 x