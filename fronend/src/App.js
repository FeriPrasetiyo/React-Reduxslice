import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Phonebookbox from './components/Phonebookbox';
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <Phonebookbox />
    </Provider>
  );
}
