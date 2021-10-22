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
const { Text, Title } = Typography;
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
    };
  }
  // This function from React runs when the website is opened
  componentDidMount() {
    // Testing GET request
    axios.get("/api/totalLinks").then((res) => {
      this.setState({
        count: res.data.totalLinks,
      });
    });
  }

  EnterLink = (value) => {
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
        });
        cookies.set(res.data.shortenLink, value);
      });
  };

  copyLink = (value) => {
    navigator.clipboard.writeText(this.state.data.at(-1).shorten);
    notification.destroy();
    notification.success({
      message: "Successfully Copied",
      description: "",
      duration: 2,
    });
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
                <Link to="/About">About</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <Row
          justify="center"
          align="middle"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <Col span={6}>
            <Title level={2} style={{ textAlign: "left" }} >
              Shortener
            </Title>
            <Title level={3} style={{ textAlign: "left" }}>
              If you're looking for a link shortener, you've come to the right
              place.
            </Title>
          </Col>
          <Col span={10}>
            <img
              src="/CoverPicture3.svg"
              width="800"
              height="500"
              alt="test"
            ></img>
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <Col xs={22} sm={16} md={16} lg={16} xl={12} xxl={8}>
            <Text keyboard>Total Links Shortened : {this.state.count}</Text>
            <Search
              loading={this.state.loading}
              placeholder="Shorten your link"
              enterButton={this.state.copy ? "Copy" : "Shorten"}
              size="large"
              onSearch={this.state.copy ? this.copyLink : this.EnterLink}
              onChange={() => this.setState({ copy: false })}
            />
          </Col>
        </Row>

        <Row justify="center" style={{ paddingBottom: "75px" }}>
          <Col xs={23} sm={20} md={20} lg={19} xl={18} xxl={17}>
            <List
              size="small"
              bordered
              dataSource={this.state.data}
              renderItem={(item) => (
                <List.Item
                  actions={
                    isMobile()
                      ? []
                      : [
                          <Button
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
    );
  }
}

export default Home;
