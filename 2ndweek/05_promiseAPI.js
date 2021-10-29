// 여러 개의 프라미스를 동시에 실행시키고, 모든 프라미스가 준비될 때까지 기다리는 경우
// Promise.all 을 사용
// let promise = Promise.all([]);

// param: 이터러블 객체, 대개는 배열 
// 새로운 프라미스를 반환 - 배열 안 프라미스가 모두 처리되면 이해
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).then(console.log);
// result = [1, 2, 3] 3초뒤 반환

// 하나라도 reject => 에러 발생 및 Promise.all reject
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log)
.catch(console.log)
// 에러가 발생할 경우 호출은 계속되지만, Promise.all은 에러 뱉고 끝


//이터러블 객체가 아니어도 Promise.all에 넘길 수 있다.
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    2,
    3
]).then(console.log);
//[1, 2, 3] 반환


// Promise.allSettled는 모든 프라미스를 그 상태값으로 반환
// 에러가 발생한 경우에는 rejected 상태를 반환
Promise.allSettled([
    new Promise((resolve, reject) => setTimeout(() => resolve(10), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(20), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(30), 3000))
]).then(console.log);
// reject 상태값을 반환하므로 then으로 처리



// Promise.race는 가장 먼저 처리되는 프라미스의 결과/에러를 반환
Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(100), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log);
// 결과: 1