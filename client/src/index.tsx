import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
                <h1 className="hidden">Sport app</h1>
				<App />
			</BrowserRouter>
            <ToastContainer />
		</Provider>
	</React.StrictMode>
);
