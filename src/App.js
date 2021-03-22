import React from "react";
import {Home} from "./pages/Home"
import './assets/css/App.css'
import 'antd/dist/antd.css';
import { Layout} from 'antd';
const { Header, Footer, Content } = Layout;

export const App = class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
      <Header>
        <div className="title"> Docs Templater </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content"><Home/></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Docs Templater ©2021 Created by Nico Chen</Footer>
    </Layout>
    );
  }
};
