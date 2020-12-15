import React from 'react';
import ReactDOM from 'react-dom';

// TailwindCSS
import './assets/main.css';

// Custom CSS
import './assets/global.scss';

// App
import App from './App';
import reportWebVitals from './reportWebVitals';

// Store
import { store } from "./redux/store/store";
import { saveState } from "./redux/store/save";
import { Provider } from "react-redux";

store.subscribe(() => {
    saveState(store.getState());
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
