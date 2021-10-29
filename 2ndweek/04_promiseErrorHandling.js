promise
    .then(f1)
    .catch(f2)
// 체인 과정에서 에러가 나면 catch에서 에러 처리
// 체인 끝에 .catch를 붙이면 에러 처리가 쉬움

// 예외가 발생하면 암시적 try..catch에서 에러를 잡고 reject처럼 다룬다.
// 그래서 체인 마지막에 catch를 붙이면 에러를 처리할 수 있다.

new Promise((resolve, reject) => {
    throw new Error("에러발생");
}).catch(function(error) {
    console.log("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.")
}).then(() => console.log("다음 핸들러가 실행됩니다."));
// 실행 순서 catch -> then
// 에러 처리 후 다음 then을 실행하게 하고 싶은 경우 위와같이 체인을 만들면 됨

new Promise((resolve, reject) => {
    throw new Error("에러 발생!");
}).catch(function(error) {
    if (error instanceof URIError) {
        //에러 처리
    } else {
        console.log("처리할 수 없는 에러");
        throw error; //에러 다시 던지기
    }
}).then(function() {
    //에러 처리 완료
}).catch(error => {
    console.log(`알 수 없는 에러가 발생함: ${error}`);
});
// 실행 순서 catch -> catch
// 에러를 연속해서 던질 수 있다.

// 브라우저 환경에서는 unhandledrejection 이벤트를 통해 전역에러를 잡을 수 있다.
window.addEventListener('unhandledrejection', function(event) {
    console.log(event.promise); // 에러를 생성하는 promise
    console.log(event.reason);
});

// 에러는 동기적 환경에서 발생했을 때만 catch로 잡을 수 있다.
// 아래 코드에서 발생하는 에러는 catch문으로 잡을 수 없음!
new Promise(function(resolve, reject) {
    setTimeout(() => {
        throw new Error("비동기적 에러");
    }, 1000)
}).catch(console.log);