import {
  Button,
  Input,
  List,
  Row,
  Col,
  notification,
  Layout,
  Menu,
  Typography,
} from "antd";
import axios from "axios";
import React from "react";
import "../App.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { Table, MobileTable } from "../components/Table";

const cookies = new Cookies();
const { Text, Title, Paragraph } = Typography;
const { Search } = Input;
const { Header } = Layout;

function isMobile() {
  return window.innerWidth < 768;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    const myCookies = cookies.getAll();
    let data = [];
    for (const key of Object.keys(myCookies)) {
      data.push({
        destination: myCookies[key],
        shorten: key,
      });
    }
    this.state = {
      data: data,
      count: 0,
      error: false,
      loading: false,
      copy: false,
      copied: false,
      animateCount: false,
      input: "",
    };
  }

  // This function runs when the website is opened
  componentDidMount() {
    // Testing GET request
    const updateCount = () => {
      axios.get("/api/totalLinks").then((res) => {
        this.setState({
          count: res.data.totalLinks,
        });
      });
    };
    updateCount();
    const countUpdateInterval = setInterval(updateCount, 5000);
    this.setState({ countUpdateInterval: countUpdateInterval });
  }

  // This function runs when React dies
  componentWillUnmount() {
    clearInterval(this.state.countUpdateInterval);
  }

  EnterLink = () => {
    let value = this.state.input;
    console.log(value);
    if (value.length < 1) {
      this.setState({
        error: true,
      });
      notification.destroy();
      notification.warning({
        message: "Error Shortening Link",
        description: "Link was invalid",
        duration: 2,
      });
      return;
    } else {
      this.setState({
        error: false,
      });
      notification.destroy();
      notification.success({
        message: "Successfully Shortened",
        description: "",
        duration: 2,
      });
    }

    if (
      !String(value).startsWith("https://") &&
      !String(value).startsWith("http://")
    ) {
      value = "http://" + value;
    }

    this.setState({
      loading: true,
    });

    axios
      .post("/api/shorten", {
        secret: "shortener",
        key: value,
      })
      .then((res) => {
        this.setState({
          data: this.state.data.concat({
            destination: value,
            shorten: res.data.shortenLink,
          }),
          count: this.state.count + 1,
          loading: false,
          copy: true,
          animateCount: true,
        });
        setTimeout(() => this.setState({ animateCount: false }), 800);
        cookies.set(res.data.shortenLink, value);
      });
  };

  copyLink = (value) => {
    notification.destroy();
    notification.success({
      message: "Successfully Copied",
      description: "",
      duration: 2,
    });
    navigator.clipboard.writeText(this.state.data[this.state.data.length-1].shorten);
    this.setState({
      copied: true
    })
  };
  

  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
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
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <Col xs={20} sm={16} md={16} lg={10} xl={8} xxl={6}>
            <div className="brandText">
              Smallify
            </div>
            <div className="paragraphText">
              If you're looking for a link shortener, you've come to the right
              place. We've shortened a total of
              {this.state.animateCount ? (
                <div
                  className="animateCount"
                  style={{ color: "#6ccc34", display: "inline-block" }}
                >
                  &nbsp;+1&nbsp;
                </div>
              ) : (
                <span style={{ color: "#1890ff" }}> {this.state.count} </span>
              )}
              links!
            </div>
          </Col>
          <Col
            xs={22}
            sm={16}
            md={16}
            lg={10}
            xl={10}
            xxl={8}
            style={{ marginTop: "50px", marginBottom: "25px" }}
          >
            <img
              src="/CoverPicture3.svg"
              height="auto"
              width="100%"
              alt="test"
            ></img>
          </Col>
        </Row>
        <div style={{ backgroundColor: "#04142c" }}>
          <Row
            justify="center"
            style={{
              paddingTop: "30px",
              paddingBottom: "30px",
              marginBottom: "30px",
            }}
          >
            <Col xs={17} sm={16} md={16} lg={16} xl={14} xxl={8}>
              {/* <Text keyboard>Total Links Shortened : {this.state.count}</Text> */}

              <Input
                style={{ borderRadius: "5px 0px 0px 5px" }}
                size="large"
                placeholder="Shorten your link"
                onChange={(e) => {
                  this.setState({
                    input: e.target.value,
                    copy: false,
                    copied: false,
                  });
                }}
                onPressEnter={this.state.copy ? this.copyLink : this.EnterLink}
              />
            </Col>

            <Col xs={6} sm={4} md={4} lg={3} xl={2} xxl={2}>
              <Button
                style={{ borderRadius: "0px 5px 5px 0px" }}
                size="large"
                block
                type="primary"
                loading={this.state.loading}
                onClick={this.state.copy ? this.copyLink : this.EnterLink}
              >
                {this.state.copy ? (this.state.copied ? "Copied" : "Copy") : "Shorten"}

              </Button>
            </Col>
          </Row>

          <Row justify="center" style={{ paddingBottom: "75px" }}>
            <Col xs={23} sm={20} md={20} lg={19} xl={18} xxl={17}>
              <List
                style={{ backgroundColor: "white", borderRadius: "5px" }}
                size="medium"
                bordered
                dataSource={[...this.state.data].reverse()}
                renderItem={(item) => (
                  <List.Item
                    actions={
                      isMobile()
                        ? []
                        : [
                            <Button
                              style={{ borderRadius: "5px" }}
                              type="primary"
                              onClick={() => {
                                notification.destroy();
                                notification.success({
                                  message: "Successfully Copied",
                                  description: "",
                                  duration: 2,
                                });
                                navigator.clipboard.writeText(item.shorten);
                              }}
                            >
                              Copy
                            </Button>,
                          ]
                    }
                  >
                    {isMobile() ? (
                      <MobileTable item={item} />
                    ) : (
                      <Table item={item} />
                    )}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
