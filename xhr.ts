const user = {
    login: 'aaa',
    password: '12345',
};

// 1. Create XMLHttpRequest
const xhr = new XMLHttpRequest();

// 2. configure
xhr.open('GET', 'http://example.com/api/users');
xhr.open('POST', 'http://example.com/api/users', true);
xhr.setRequestHeader('Content-Type', 'application/json');

// 3. set 'event listeners'
xhr.onerror = (err) => console.log(err);
xhr.onload = (resp) => console.log(resp);



// 4. send
xhr.send(JSON.stringify(user));
