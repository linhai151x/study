// function decorateArmour(target, key, descriptor) {
//     const method = descriptor.value;
//     console.log(method);
//     let moreDef = 100;
//     let ret;
//     descriptor.value = (...args)=>{
//         args[0] += moreDef;
//         ret = method.apply(target, args);
//         return ret;
//     }
//     return descriptor;
//    }
// class Man{
//     constructor(def = 2,atk = 3,hp = 3){
//     this.init(def,atk,hp);
//     }
//    @decorateArmour
//     init(def,atk,hp){
//         this.def = def; // 防御值
//         this.atk = atk; // 攻击力
//         this.hp = hp; // 血量
//     }
//     toString(){
//         return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
//     }
//    }
   
//    var tony = new Man();
   
//    console.log(`当前状态 ===> ${tony.toString()}`); 


// 使用原生来写
// 首先我们要创建一个基类
// function Man(){
//     this.def = 2;
//     this.atk = 3; 
//     this.hp = 3;
//    }
   
//    // 装饰者也需要实现这些方法，遵守 Man 的接口
//    Man.prototype={
//     toString:function(){
//         return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
//     }
//    }
//    // 创建装饰器，接收 Man 对象作为参数。
//    var Decorator = function(man){
//     this.man = man;
//    }
   
//    // 装饰者要实现这些相同的方法
//    Decorator.prototype.toString = function(){
//     return this.man.toString();
//    }
   
//    // 继承自装饰器对象
//    // 创建具体的装饰器，也是接收 Man 作对参数
//    var DecorateArmour = function(man){
   
//     var moreDef = 100;
//     man.def += moreDef;
//     Decorator.call(this,man);
   
//    }
//    DecorateArmour.prototype = new Decorator();
   
//    // 接下来我们要为每一个功能创建一个装饰者对象，重写父级方法，添加我们想要的功能。
//    DecorateArmour.prototype.toString = function(){
//     return this.man.toString();
//    } 
   
//    // 注意这里的调用方式
//    // 构造器相当于“过滤器”，面向切面的
//    var tony = new Man();
//    tony = new DecorateArmour(tony);
   
//    console.log( `防御力:${tony.toString()}`);
//    // 输出：当前状态 ===> 防御力:102,攻击力:3,血量:3



//------------ 
// import "reflect-metadata";

// const requiredMetadataKey = Symbol("required");

// function required(target, propertyKeyl, parameterIndex) {
//     console.log(target,propertyKeyl,parameterIndex)
//     let existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
//     existingRequiredParameters.push(parameterIndex);
//     Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
// }

// function validate(target, propertyName, descriptor) {
//     let method = descriptor.value;
//     descriptor.value = function () {
//         let requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
//         if (requiredParameters) {
//             for (let parameterIndex of requiredParameters) {
//                 if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
//                     throw new Error("Missing required argument.");
//                 }
//             }
//         }

//         return method.apply(this, arguments);
//     }
// }

// class Greeter {

//     constructor(message) {
//         this.greeting = message;
//     }

//     @validate
//     greet(@required name) {
//         return "Hello " + name + ", " + this.greeting;
//     }
// }
// let greet = new Greeter('您好');
// let result = greet.greet('小明');
// console.log(result);
