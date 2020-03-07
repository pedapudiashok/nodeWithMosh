
console.log('Before');

/* getUser(1,(user) => {
    console.log(user);

    getRepositories(user.userName,(List) => {
        console.log('Repo List',List)
    })
});
 */
console.log('After')

function getUser(id,callback) {
    setTimeout( () => {
        //console.log('Scheduled Function');
        callback({id:id,userName:'ashok'})
        
    },2000);
        
}

function getRepositories(username,callback) {

    setTimeout( ()=> {
        callback(['repo1','repo2','repo3'])
    },2000)
}


function p() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(1);
        }, 2000)
    })
}

(async function get() {
    let q = await p();
    console.log('q',q);
})()
