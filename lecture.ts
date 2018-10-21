

const a = [1, 2, 3, 4, 5];
let b = {
    prop: 42,
    method() {
        console.log(this.prop);
    },
};
const string = `multiline string 
with ${a[0]} templating`;

const func = (arr: Array) => arr.map(x => x * x);

const [first, ...rest] = a;
const {prop} = b;


const weakMap = new WeakMap();
const privateSymbol = Symbol();



console.log(a, b, func, first, rest, prop);



//-------------

function printMaximum(number) {
    console.log(number.maxinum);
}

let a = 5;

if (a > 4) {
    a = {
        minimum: 5,
        maximum: 10,
    };
}

printMaximum(a);


interface IRange {
    minimum: number;
    maximum: number;
}

function printRangeMax(range: IRange) {
    console.log(range ? range.maximum : '');
}

let b: IRange | number = 5;

if (b > 5) {
    b = {
        minimum: 5,
        maximum: 10,
    };
}

let value = ' ';
const obj = {};
const arrayIndex;

if (string.trim()) {
    // do something with non empty string
}

if (!obj) {
    // protect from null or undefined instead of object
}

if (arrayIndex) {
    // todo What do you try to say?
    // arrayIndex !== 0 or array index !== undefined ??
}

const a = 'a';
const b = 'b';

const and: string = a && b;
const AND: string = !a ? b : a;

const or: string = a || b;
const OR: string = a ? a : b;


function accessor(obj) {
    return obj && obj.prop && obj.prop.subprop //  obj?.prop?.subprop
}

function remap(arr, fn) {
    return (arr || []).map(fn);
}


// lexical scope

interface IGetter {
    getter: () => string;
    txt: string;
}

const txt = 'a';

function builder(): IGetter {
  const VERY_BIG_TEMPORARY_ARRAY = [];
  const txt = 'b';

  return { txt: 'c', getter: () => txt}
}

function printer(obj: IGetter) {
    const txt = 'd';
    console.log(obj.getter());
}

// ==========

const objToPrint = builder();
printer(objToPrint);


function builder() {
    let a;
    let setter = val => a = val;
    return setter;
}

function printer(fn: (val: any) => void) {
    let b;
    let ownSetter = val => b = val;

    let setter = fn;
    fn(ownSetter);
}

printer(builder());

// =============

const summmFn = a => b => () => a + b;


// Calculate 3 + 5 using summm function
summmFn(3)(5)();


const array = [1, 2, 3, 4, 5];
const sumSquareFn = (acc, val) => acc + val * val;


// calculate sum of squares for array
const sumsquare = array.reduce(sumSquareFn, 0);


// =============
function sendToServer(txt: string) {}

const firstArticle = document.getElementsByTagName('article').item(0);
const firstArticleTitle = firstArticle.getElementsByClassName('article__title')[0];
sendToServer(firstArticleTitle.textContent);


const DELAY_BETWEEN_CLICKS = 200; // ms
const ARTICLE_TAG = 'article';

/// ================
const customers = [];
function print(arg: any){}


const arr = [1,2,3,4,5];


let sumSuqare = 0;
for (let i = 0, length = arr.length; i < length; i++) {
    sumSuqare = sumSuqare + arr[i] * arr[i];
}


const allMoneys     = customers.reduce((acc, customer) => acc + customer.money, 0);
const ids           = customers.map(customer => customer.id);
const firstCustomer = customers.find(customer => customer.id === 1);

customers.forEach(customer => print(customer));


const wrapper = document.getElementById('wrapper');
wrapper.addEventListener('click', event => {

    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();

});
