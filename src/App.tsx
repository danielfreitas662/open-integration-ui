import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './routes/main';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  components: {
    Layout: {
      siderBg: '#ffff',
      headerBg: '#ffff',
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
