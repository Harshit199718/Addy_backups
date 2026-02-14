import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import 'react-phone-input-2/lib/style.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { register } from './utils/firebase/serviceWorker';
import { PWAInstallProvider } from './app/PWAInstallContext.jsx';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PWAInstallProvider>
        <App />
      </PWAInstallProvider>
    </Provider>
  </BrowserRouter>,
)

