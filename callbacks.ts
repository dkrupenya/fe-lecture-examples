function makeGetXHR(url: string, callback: (err, resp) => void) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onerror = (event) => callback(xhr.responseText, null);
    xhr.onload  = (event) => callback(null, JSON.parse(xhr.responseText));
    xhr.send();
}


makeGetXHR('stations', (err1, stations) => {

    makeGetXHR(`departures?station=${stations[0].id}`, (err2, trains) => {

        makeGetXHR(`places?train=${trains[0].id}`, (err3, places) => {

            makeGetXHR(`buy?place=${places[0].id}`, (err4, ticket) => {
                console.log(ticket);
            }); // buy
        }); // tickets
    }); // trains
}); // stations


function fetchXHR(url: string): Promise {
    const promise$ = new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.onerror = event => reject(xhr.responseText);
        xhr.onload  = event => resolve(JSON.parse(xhr.responseText));

        xhr.open('GET', url, true);
        xhr.send();
    });
    return promise$;
}

fetchXHR('stations')
    .then(stations => {

        fetchXHR(`departures?station=${stations[0].id}`)
            .then(trains => {

                fetchXHR(`tickets?train=${trains[0].id}`)
                    .then(places => {

                        fetchXHR(`buy?place=${places[0].id}`)
                            .then(ticket => {
                                console.log(ticket);

                            }); // buy
                    }); // tickets
            }); // trains
    }); // stations

fetchXHR('stations')
    .then(stations => fetchXHR(`departures?station=${stations[0].id}`))
    .then(trains   => fetchXHR(`seats?train=${trains[0].id}`))
    .then(seats    => seats.find(seat => seat.isAvailable))
    .then(seat    => fetchXHR(`buy?ticket=${seat[0].id}`))
    .then(ticket   => console.log(ticket));


const train$: Promise = fetchXHR('stations').then(stations => fetchXHR(`departures?station=${stations[0].id}`));

const tickets$  = train$.then(trains => fetchXHR(`tickets?train=${trains[0].id}`));
const info$     = train$.then(trains => fetchXHR(`train_info?train=${trains[0].id}`));


// base promise

const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://example.com', true);
xhr.onerror = (event) => console.warn(xhr.statusText);
xhr.onload = (event) => console.log(xhr.responseText);
xhr.send();



const promise$ = new Promise(..., ...); // discuss later

promise$.then(resolve => console.log(resolve));
promise$.catch(error  => console.log(error));

// shorthand
promise$.then(
    resolve => console.log(resolve),
    error   => console.log(error)
    );


// errors


fetchXHR('stations')
    .then(stations => fetchXHR(`departures?station=${stations[0].id}`))
    .then(trains   => fetchXHR(`seats?train=${trains[0].id}`))
    .then(seats   => seats.find(seat => seat.isAvailable))
    .then(seat    => fetchXHR(`buy?ticket=${seat[0].id}`))
    .then(ticket   => console.log(ticket))
    .catch(err     => console.error(err));


fetchXHR('stations')
    .then(stations => fetchXHR(`departures?station=${stations[0].id}`))
    .then(
        trains   => fetchXHR(`seats?train=${trains[0].id}`),
        err     => console.error('DEPARTURES LOADING ERROR')
        )
    .catch(err     => console.error('TRAINS LOADING ERROR'))
    .then(seats   => seats.find(seat => seat.isAvailable))
    .then(seat    => fetchXHR(`buy?ticket=${seat[0].id}`))
    .then(ticket   => console.log(ticket));


fetchXHR('stations')
    .then(stations => fetchXHR(`departures?station=${stations[0].id}`))
    .catch(err     => console.error(err))
    .then(trains   => fetchXHR(`seats?train=${trains[0].id}`))
    .then(seats   => seats.find(seat => seat.isAvailable))
    .then(seat    => fetchXHR(`buy?ticket=${seat[0].id}`))
    .then(ticket   => console.log(ticket))
    .catch(err     => console.error(err));


fetchXHR('stations')
    .then(stations => fetchXHR(`departures?station=${stations[0].id}`))
    .catch(err     => {
        console.error(err);

        // I want to perform default action
        return 'id_London';

        // I want to prevent other actions
        return Promise.reject({reason: 'LOAD_STAIONS_FAILED'});

        throw new Error('LOAD_STAIONS_FAILED')

    })
    .then(trains   => fetchXHR(`seats?train=${trains[0].id}`))
    .then(seats   => seats.find(seat => seat.isAvailable))
    .then(seat    => fetchXHR(`buy?ticket=${seat[0].id}`))
    .then(ticket   => console.log(ticket))
    .catch(err     => console.error(err));




// common mistakes

// Don’t do this
function loadTrains() {
    const stations$  = fetchXHR('stations');
    stations$.then(stations => fetchXHR(`departures?station=${stations[0].id}`));
    return stations$;
}

function loadTrains() {
    const stations$  = fetchXHR('stations');
    const trains$  = stations$.then(stations => fetchXHR(`departures?station=${stations[0].id}`));
    return trains$;
}

const seats$ = fetchXHR('stations')
    .then(stations => fetchXHR(`departures`)
        .then(trains => fetchXHR(`seats`)));


const seats$ = fetchXHR('stations')
    .then(stations => fetchXHR(`departures`))
    .then(trains   => fetchXHR(`seats`));


const resolved$ = Promise.resolve(`I'm resolved`);
resolved$.then(value => console.log(value));

const rejected$ = Promise.resolve(`I'm rejected`);
rejected$.catch(err => console.log(err));


Promise.all([
    fetchXHR('cities'),
    fetchXHR('stations'),
    fetchXHR('discounts'),
]).then(response => console.log(response[0], response[1], response[2]));

Promise.race([
    fetchXHR('askMailru'),
    fetchXHR('askYandex'),
    fetchXHR('askGoogle'),
]).then(response => console.log(response[0], response[1], response[2]));



console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

console.log(4);
