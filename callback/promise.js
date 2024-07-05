const promise = new Promise((resolve,reject)=>{
    //resolve('success');
    reject('Failure')
})
.then(value => {
    console.log(value);
})
.catch(error =>{
    console.log(error);
})