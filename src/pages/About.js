import { Button, Input, List, Row, Col, Layout, Menu } from "antd";
import { RiseOutlined, CheckOutlined, StarOutlined } from "@ant-design/icons";
import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

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
                <Link to="/About">About</Link>
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
            style={{ marginLeft: "0px" }}
          >
            <div className="titleText">Why Smallify?</div>
            <div className="paragraphText">
              <RiseOutlined /> Quick <br />
              <CheckOutlined /> Easy <br />
              <StarOutlined /> No Ads <br />
            </div>
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <Col xs={20} sm={16} md={16} lg={10} xl={8} xxl={6}>
            <div className="titleText">The Team</div>
            <div className="paragraphText">
              Person 1 <br />
              Person 2 <br />
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
