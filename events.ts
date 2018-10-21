function app() {

setTimeout(() => console.log('after 3 seconds'), 3000);


const token = setTimeout(() => console.log('cancelled'), 3000);
clearTimeout(token);



const clock = setInterval(() => console.log('repeat each second'), 1000);
setTimeout(() => {
    clearInterval(clock);
}, 1000 * 60 * 60);


function doAfterFiveSeconds(counter: number) {
    if (counter < 0) {
        setTimeout(() => doAfterFiveSeconds(counter - 1), 5000);
    }
}
doAfterFiveSeconds(10);

}


// Quiz setTimeout 1

console.log(1);

setTimeout(() => console.log(2), 0);

console.log(3);



// Quiz setTimeout 2

function sleep(delay: number) {
    const time: number = Date.now();
    while (Date.now() < time + delay) {

    }
}
//=========================


console.log(1);
const a = [1,2,3];

setTimeout(() => {
  console.log(2);
  a[0] = 'e95';
}, 0);
sleep(5000);

console.log(3);
