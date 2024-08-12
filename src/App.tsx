import s from './App.module.css'
import * as React from "react"
import {Settings} from "./Components/Settings/Settings";
import {Provider} from "react-redux";
import store from "./Redux/redux-store";
import {MainPage} from "./Components/MainPage/MainPage";
const App: React.FC = () => {
  return (
    <div className={s.layout}>
      <div className={s.header}>
          <Settings/>
      </div>
      <div className={s.content}>
          <MainPage/>
      </div>
      <div className={s.footer}>
          <div>Created by Zebra of Love in 2024</div>
          <a color='black' href="https://github.com/zebraoflove?tab=repositories">Github</a>
      </div>
    </div>
  )
}
const MainApp = () => {
    return <Provider store={store}>
        <App/>
    </Provider>
}
export default MainApp;
