import React from "react";
import {Home} from "./pages/Home"
import 'antd/dist/antd.css';
import { Layout} from 'antd';
const { Header, Footer, Content } = Layout;

export const App = class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
      <Header>
        <div style={title}> Docx Templater </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={siteLayoutContent}><Home/></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Docs Templater ©2021 Created by Nico Chen</Footer>
    </Layout>
    );
  }
};


const siteLayoutContent  = {
  minHeight: '280px',
  padding: '24px',
  background: '#fff',
}

const title = {
  float: 'left',
  color: '#fff',
  fontSize: '18px',
}

