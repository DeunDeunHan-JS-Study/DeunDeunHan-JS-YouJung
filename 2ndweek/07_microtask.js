// .then/catch/finally는 항상 비동기적으로 실행된다.
let promise = Promise.resolve();

promise.then(() => console.log("프라미스 성공!"));
console.log("코드 종료"); //코드 종료가 먼저 실행됨!

promise
    .then(() => console.log("마이크로태스크 프라미스"))
    .then(() => console.log("마이크로태스크 프라미스 코드 종료!"));
// 순서를 정하고 싶은 코드는 큐에 넣을 것!

// unhandledrejection 
promise = Promise.reject(new Error("프라미스 실패!"));
setTimeout(() => promise.catch(err => console.log('잡았다!'), 1000));
/*
    unhandledrejection은 마이크로태스크 큐 내 모든 작업이 완료되었을 때 생성
    setTimeout을 사용하면 비동기처리로 인해 마이크로태스크 큐 내 작업이 없기 때문에
    undhandledrejection이 먼저 로그에 찍힌다!
*/