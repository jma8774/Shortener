import React from "react";
import "../App.css";
import { Row, Col, Layout, Menu, Avatar, Divider , Typography, Tooltip } from "antd";
import { DashboardTwoTone, SmileTwoTone, StopTwoTone, GithubFilled, LinkedinFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Linker = Typography.Link

function isMobile() {
  return window.innerWidth < 768;
}

const { Header } = Layout;

class About extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo"></div>
            <Menu theme="dark" mode="horizontal" selectedKeys={[null]}>
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: "50px", marginBottom: "100px" }}
        >
          <Col xs={22} sm={16} md={16} lg={10} xl={10} xxl={8}>
            <img
              src="/CoverPicture.svg"
              height="auto"
              width="100%"
              alt="test"
            ></img>
          </Col>
          <Col span={2}></Col>
          <Col
            xs={20}
            sm={16}
            md={16}
            lg={10}
            xl={8}
            xxl={6}
            style={isMobile() ? {marginTop: '40px'} : {}}
          >
            <div className="titleText">Why Smallify?</div>
            <div className="paragraphText" style={{fontSize: "18px"}}>
              <SmileTwoTone /> Easy To Use<br />
              <DashboardTwoTone twoToneColor="#52c41a"/> Links Never Expire <br />
              <StopTwoTone twoToneColor="#eb2f96"/> No Ads <br />
            </div>
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: "50px", paddingBottom: "100px" }}
        >
          <Col xs={20} sm={16} md={16} lg={10} xl={8} xxl={6}>
            <div className="titleText">The Team</div>
            <div className="paragraphText" style={{fontSize: "18px"}}>
              <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <Avatar size="large" src="/jiaming.jpg"/> &nbsp; Jia Ming Ma 
                <Divider type="vertical"/> 
                <Tooltip placement="top" title="Open GitHub Page"> 
                  <Linker href="https://github.com/jma8774" target="_blank" style={{color:'black'}}> <GithubFilled /> </Linker> 
                </Tooltip>
                <Tooltip placement="top" title="Open LinkedIn Page"> 
                  <Linker href="https://www.linkedin.com/in/jma8774/" target="_blank" style={{color:'black'}}> <LinkedinFilled/> </Linker> 
                </Tooltip>
              </div>
              <div style={{marginBottom: '50px'}}>
                <Avatar size="large" src="/brian.png"/> &nbsp;  Brian Cheung 
                <Divider type="vertical"/> 
                <Tooltip placement="top" title="Open GitHub Page"> 
                  <Linker href="https://github.com/BrianCheung1" target="_blank" style={{color:'black'}}> <GithubFilled /> </Linker> 
                </Tooltip>
                <Tooltip placement="top" title="Open LinkedIn Page"> 
                  <Linker href="https://www.linkedin.com/in/brian-cheung-a82a191a3/" target="_blank" style={{color:'black'}}> <LinkedinFilled/> </Linker> 
                </Tooltip>
              </div>
            </div>
          </Col>
          <Col xs={22} sm={16} md={16} lg={10} xl={10} xxl={8}>
            <img
              src="/CoverPicture2.svg"
              height="auto"
              width="100%"
              alt="test"
            ></img>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
