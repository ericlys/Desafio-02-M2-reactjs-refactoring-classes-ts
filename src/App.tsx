import { BrowserRouter as Router } from 'react-router-dom';
import { FoodsProvider } from './hooks/useFoods';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <>
    <GlobalStyle />
    <FoodsProvider>
      <Router>
        <Routes />
      </Router>
    </FoodsProvider>
  </>
);

export default App;
