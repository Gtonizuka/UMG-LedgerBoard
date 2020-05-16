import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client'
import { executeCommand } from '../socketsEvents'
import { QUOTEBOOK_EVENTS } from '../static/commands'

const QuotesContext = createContext();

const QuotesContextProvider = props => {
    const [quotes, setQuotes] = useState([]);

    const socket = io('http://localhost:3000/');

    useEffect(() => {
        executeCommand(socket, QUOTEBOOK_EVENTS)
        socket.on('quoteBook', (msg) => {
            setQuotes(msg)
        })

        socket.onclose = () => {
            socket.close();
        };

        return () => {
            socket.close();
        };
    }, []);


    const addQuote = newQuote => {
        setQuotes([...quotes, newQuote]);
    };

    const removeQuote = id => {
        setQuotes(quotes.filter(quote => quote.id !== id));
    };

    return (
        <QuotesContext.Provider value={{ quotes, setQuotes, addQuote, removeQuote }}>
            {props.children}
        </QuotesContext.Provider>
    );
};

export { QuotesContextProvider, QuotesContext };