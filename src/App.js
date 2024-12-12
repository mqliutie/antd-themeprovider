import {createRoot} from 'react-dom/client'
import './App.css';
import {Modal, ConfigProvider} from "antd";
import {useEffect} from "react";


const ThemeProvider = (props) => {
  return <ConfigProvider theme={{
    "cssVar": true,
    "hashed": false,
  }}>
    {props.children}
  </ConfigProvider>
}


const T = (props) => {
  const [modal, context] = Modal.useModal()
  useEffect(() => {
    modal.confirm({title: '123', content: 123, onCancel: props.onCancel});
  }, [])
  return <ThemeProvider>{context}</ThemeProvider>
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <div>
          <button onClick={() => {
            Modal.info({title: "hello", maskClosable: true})
          }}>Modal.info
          </button>
        </div>
        <div>
          <button onClick={() => {
            const ModalContainer = document.createElement('div')
            ModalContainer.className = 'GKModalShowClass'
            document.body.appendChild(ModalContainer)
            const reactRoot = createRoot(ModalContainer)
            reactRoot.render(
              <T onCancel={() => {
                reactRoot.unmount()
                // 销毁容器
                ModalContainer.remove()
              }}/>,
            )
          }}>hook
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
