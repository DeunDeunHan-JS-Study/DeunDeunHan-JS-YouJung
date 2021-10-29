/*
    Async
    async 함수는 항상 프라미스를 반환
    프라미스가 아닌 값을 반환해도, resolved promise로 값을 감싸서 반환
    async를 사용하면 일반 동기코드를 짜는 것처럼 짤 수 있다.
*/

const async_f = async () => 1;
async_f().then(console.log);

const resolved_async_f = async () => Promise.resolve(2);
resolved_async_f().then(console.log);

/*
    Await
    await는 async 함수 안에서만 작동
    프라미스가 처리될때까지 기다렸다가, 처리되고 나면 결과 반환
*/

const await_f = async () => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("완료!"), 1000);
    });

    let result = await promise;

    console.log(result);
};

await_f();
// async를 사용하면 프라미스 체인을 가독성있게 표현할 수 있다

// async에서 에러 핸들링
// 1. async 함수 자체에 try catch문 넣기
const catchError = async () => {
    try{
        await Promise.reject(new Error("에러 발생!"));
    } catch (err) {
        console.log(err);
    }
};

// 2. async 함수를 실행할 때 catch 붙이기
const catchError2 = async () => {
    await Promise.reject(new Error("에러 발생"));
};

catchError2().catch(console.log);


// 과제 1
/*
const loadJson = async(url) => {
   let response = await fetch(url);

   if (response.status == 200) {
       let json = await response.json
       return json;
   } else {
       throw new Error(response.status);
   }
};

loadJson().catch(console.log);
*/

// 과제 2
function loadJson(url) {
    let response = await fetch(url);
    if(response.status == 200) {
        let json = await response.json();
        return json;
    } else {
        throw new HttpError(response);
    }
};

function demoGithubUser() {
    let user;
    
    while(true) {
        let name = await prompt("GitHub uername을 입력하세요.", "iliakan");
        
        try {
            let json = await loadJson(`https://api.github.com/users/${name}`);
            user = json;
            break;
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                console.log("일치하는 사용자가 없습니다. 다시 입력해주세요.");
            } else {
                throw err;
            }
        }
    }
    
    console.log(`이름: ${user.name}`);
    return user;
};

demoGithubUser();

// 과제 3
async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return 10;
};

function f() {
    wait().then(console.log);
};
