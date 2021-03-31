import React from "react";
import {Home} from "./pages/Home"
import 'antd/dist/antd.css';
import { Layout} from 'antd';
const { Header, Footer, Content } = Layout;

export const App = class App extends React.Component {
  render() {
    return (
      <Layout className="layout">
      <Header style = {headerLayout}>
        <a href="/" style={title}>Docx Templater</a>
      </Header>
      <Content style={{ padding: '0 20px' ,marginTop: 90}}>
        <div style={siteLayoutContent}><Home/></div>
      </Content>
      <Footer style={footer}>
        Docx Templater ©2021 Created by  
        <a href="https://nico-chen.com/" target="_blank" rel="noreferrer" style={{ marginLeft: 5}}>
              Nico Chen
        </a>
      </Footer>
    </Layout>
    );
  }
};


const siteLayoutContent  = {
  padding: '24px',
  background: '#fff',
  height: "calc(100vh - 160px)",
}

const headerLayout ={
  position: 'fixed', 
  zIndex: 100, 
  width: '100%'
}

const title = {
  float: 'left',
  color: '#fff',
  fontSize: '18px',
}

const footer = {
  textAlign: 'center'
}

