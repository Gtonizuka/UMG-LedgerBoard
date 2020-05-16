const unsubscribeQuoteBook = () => {
    let subscribeQuotes = 'quoteBook.unsubscribe';
    socket.emit(subscribeQuotes, {});
    console.log('unsubscribe')
}

const subscribeQuoteBook = () => {
    let subscribeQuotes = 'quoteBook.subscribe';
    socket.emit(subscribeQuotes, {});
    let quote;
    // socket.on('quoteAction', function (msg) {
    //     quote = msg;
    //     console.log(msg.quote.id)
    //     setQuotes(oldQuotes => [...oldQuotes, msg])
    // });

}



socket.send('hi');

socket.on('message', (msg) => {
    // my msg
    console.log(msg)
});

let request = 'accountMaster.snapshot';
socket.emit(request, {});


socket.on('accountMaster', function (msg) {
    console.log('Incoming: accountMaster', msg);
});