import { Button, Slider, Space, Upload, Popconfirm, Popover, Input, List} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import '../App.css';

const { Search } = Input;

const popContent = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const data = [
];


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someValue: 0
    }
  }
  // This function from React runs when the website is opened
  componentDidMount() {
    // Testing GET request
    axios.get(`/test`)
      .then(res => {
        console.log("HI YOUR BACKEND GET IS HERE!", res.data)
      })
  }
  onSearch = (value) => {
    console.log(value)
    this.setState({
      someValue : value
    })
    data.push(value)
  };


  render() {
    return (
      <div className="App">
        <br />
        <Space
          direction="vertical"
          style={{ width: "75%", backgroundColor: "white" }}
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
            onSearch={this.onSearch}
            style={{ width: "50%" }}
          />

          <List
            size="small"
            header={<div>History</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item.Meta
                title={item}
              />
            )}
          />
        </Space>
      </div>
    );
  }
}

export default Home;
