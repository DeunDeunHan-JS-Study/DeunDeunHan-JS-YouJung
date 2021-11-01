<h2>
    import vs require
</h2>

https://www.daleseo.com/js-module-require/

<ul>
    <li>require: CommonJS (NodeJS에서 사용) 문법</li>
    <li>import: ES6 문법</li>
</ul>

<h4>
    객체 내보내기
</h4>

module.exports = obj;

module.obj = obj;

<h4>
    객체 불러오기
</h4>

const obj = require("./exports");

obj.exports_function();



**node.js에서는 자바스크립트 파일이 모듈인지 아닌지 확인 할 수 없음!**

**모듈은 HTTP, HTTPS 프로토콜 배경에서만 사용하자.**



------



<h2>
    모듈 소개
</h2>




<h4>
    모듈?
</h4>

​	하나의 자바스크립트 파일

​	export와 import를 활용하여 모듈 간 기능 공유를 할 수 있다.



```javascript
//sayHi.js
export function sayHi(user) {
    console.log(`Hello, ${user}!`);
}

//main.js
import {sayHi} from './sayHi.js';

sayHi("uju");
```

```html
<!--index.html-->
<!doctype html>
<script type="module">
    import {sayHi} from './say.js';
    
    document.body.innerHTML = sayHi("John");
</script>
```



<h4>
    일반 스크립트와의 차이점
</h4>

**엄격 모드로 실행**

**단 한번만 평가됨**

​	최초 호출시 단 한번만 실행되며, 실행 후 결과는 import한 모든 모듈에 보내진다.

```javascript
// 1.js
import {admin} from './admin.js';
admin.name = "John";

// 2.js
import {admin} from './admin.js';
alert(admin.name); //John 출력
```

**import.meta**

​	현재 모듈에 대한 정보 제공

**this는 undefined**



<h2>
    모듈 내보내고 가져오기
</h2>

<h4>
    export/import
</h4>

```javascript
export let months = ['Jan', 'Feb', 'Mar', 'Apr'];

export const year = 2021;

export class user {
    constructor(name) {
        this.name = name;
    }
}
```

```javascript
//say.js
const sayHi = (user) => {
	console.log(`Hello, ${user}`);
}

const sayBye = (user) => {
    console.log(`Hello, ${user}`);
}

export {sayHi, sayBye};
```

```javascript
//main.js
import {sayHi, sayBye} from './say.js';
//import * as say from './say.js';

sayHi('John'); //say.sayHi('John')
sayBye('John'); //say.sayBye('John')
```



<h4>
    import/export 'as'
</h4>

```javascript
import {sayHi as hi, sayBye as bye} from './say.js';

export {sayHi as hi, sayBye as bye};
```



<h4>
    export default
</h4>

export default: 해당 모듈엔 개체가 하나만 있다는 사실을 명확히 나타낼 수 있음

하나의 파일에는 최대 하나의 export default가 존재한다.

중괄호 없이 import할 수 있다.

```javascript
//user.js
export default class User {}

//main.js
import User from './user.js'
```



default export로 내보낼 개체에는 이름이 없어도 된다.

```javascript
export default class {}
export default function() {}
export default ['a', 'b', 'c']
```



기본 내보내기를 참조하는 용도로도 사용할 수 있다.

```javascript
export {sayHi as default};

import {default as sayHi} from './user.js';
```



default export로 내보낸 개체는 import할 때 원하는대로 이름을 지정할 수 있다.

```javascript
export default class {}

import User from './user.js';
```



<h4>
    모듈 다시 내보내기
</h4>

보안 때문에 모듈을 공개하면 안되는 경우가 있을 수 있다.

그럴 때에는 다른 모듈에서 해당 모듈을 가져온 후, 다시 내보내기를 통해 다른 부분을 숨길 수 있다.

또한 외부 개발자들도 다시 내보내기한 모듈을 사용함으로써 패키지를 이용할 수 있다.



**export default를 다시 내보내는 경우**

```javascript
//user.js
export default class User {}
export function sayHi(user) {console.log(user)}

//export.js
export {default} from './user.js' //default 다시 내보내기
export * from './user.js' //default는 다시 내보내지지 않는다
```



<h2>
    동적으로 모듈 가져오기
</h2>

export/import문은 정적인 방식이다.

그러므로 import 문에 동적 매개변수를 사용할 수 없고,

런타임이나 조건부로 모듈을 불러올 수 없다.

동적으로 모듈을 가져올 때에는 **import(module)**  표현식을 사용해야 한다.



**프라미스 사용하기**

```javascript
let modulePath = prompt("어떤 모듈을 불러오고 싶으세요?");

import(modulePath)
	.then(obj => <모듈 객체>)
	.catch(err => <에러 핸들링>)
```



**await 사용하기**

```javascript
//say.js
export function hi() {
    console.log('안녕하세요.');
}
export function bye() {
    console.log('안녕히 가세요.');
}

//main.js
let {hi, bye} = await import ('./say.js');
```



**default export await로 import하기**

```javascript
//say.js
export default function() {
    console.log("export default 모듈");
}

//main.js
let obj = await import('./say.js');
let say = obj.default;
//let {default: say} = await import('./say.js')와 같다
```

