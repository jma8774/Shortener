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
    this.state = {
      someValue: 0,
      data: [],
      count: 0,
      error: false,
    };
  }
  // This function from React runs when the website is opened
  componentDidMount() {
    // Testing GET request
    axios.get(`/test`).then((res) => {
      console.log("HI YOUR BACKEND GET IS HERE!", res.data);
    });
    axios.get("/testTotal").then((res) => {
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
      notification.warn({
        message: "Error Shortening Link",
        description: "Link was invalid",
      });
      return;
    } else {
      this.setState({
        error: false,
      });
    }
    value = "https://" + value;
    this.setState({
      someValue: value,
    });

    axios
      .post("/shorten", {
        key: value,
      })
      .then((res) => {
        this.setState({
          data: this.state.data.concat({
            destination: value,
            shorten: res.data.shortenLink,
          }),
          count: this.state.count + 1,
        });
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
          {/* buttons with space */}
          <Space>
            <Button type="primary">Button</Button>
            <Upload>
              <Button>
                <UploadOutlined /> Click to Upload
              </Button>
            </Upload>
            <Popconfirm
              title="Are you sure delete this task?"
              okText="Yes"
              cancelText="No"
            >
              <Button>Confirm</Button>
            </Popconfirm>
          </Space>

          {/* slider */}
          <Slider
            defaultValue={30}
            disabled={false}
            style={{ width: "100%" }}
          />

          {/* hover */}
          <Popover content={popContent} title="Title">
            <Button type="primary">Hover me</Button>
          </Popover>

          <Input placeholder="Basic usage" />

          <Search
            placeholder="input search text"
            allowClear
            enterButton="Shorten"
            size="medium"
            onSearch={this.EnterLink}
            style={{ width: "50%" }}
          />

          <List
            size="small"
            //header={<div>History</div>}
            bordered
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item actions={[<Button type="primary">Copy</Button>]}>
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
