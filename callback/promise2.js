const promise = new Promise((resolve,reject)=>{
    resolve('success');
    //reject('Failure')
})
.then(value => {
    console.log(value);
    return "One";
})
.then(value => {
    console.log(value);
    return "two";
})
.then(value => {
    console.log(value);
    return "three";
})
.then(value => {
    console.log(value);
    return "four";
})
.catch(error =>{
    console.log(error);
})