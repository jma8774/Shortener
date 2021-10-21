import {
  Button,
  Slider,
  Space,
  Upload,
  Popconfirm,
  Popover,
  Input,
  List,
  Typography,
  Statistic,
  Card,
  Row,
  Col,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import "../App.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const { Search } = Input;
const { Text } = Typography;

const popContent = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function limit(string) {
  if (string.length > 25) {
    return string.substring(0, 25) + "...";
  }
  return string;
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
        <br />
        <Space
          direction="vertical"
          style={{ width: "75%", backgroundColor: "" }}
        >
          <Search
            loading={this.state.loading}
            placeholder="Shorten your link"
            enterButton={this.state.copy ? "Copy" : "Shorten"}
            size="large"
            onSearch={this.state.copy ? this.copyLink : this.EnterLink}
            onChange={() => this.setState({ copy: false })}
            style={{ width: "50%" }}
          />

          <List
            size="small"
            //header={<div>History</div>}
            bordered
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item
                actions={[
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
                ]}
              >
                <div
                  style={{
                    backgroundColor: "",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <Text
                    strong
                    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    {limit(item.destination)}
                  </Text>
                  <Text strong style={{ marginLeft: "auto" }}>
                    {item.shorten}
                  </Text>
                </div>
              </List.Item>
            )}
          />

          <Row gutter={16}>
            <Col span={12}>
              <Card style={{ backgroundColor: "" }}>
                <Statistic
                  title="Total Links Shortened"
                  value={this.state.count}
                  //precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  //prefix={<ArrowUpOutlined />}
                  //suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card style={{ backgroundColor: "" }}>
                <Statistic
                  title="Top Clicked Link"
                  value="https://google.com"
                  //precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  //prefix={<ArrowUpOutlined />}
                  //suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    );
  }
}

export default Home;
