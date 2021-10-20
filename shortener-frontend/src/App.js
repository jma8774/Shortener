import {Button, Slider, Space, Upload, Popconfirm, Popover, Input,} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./App.css";

const popContent = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const { Search } = Input;

const onSearch = (value) => console.log(value);

function App() {
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
        <Slider defaultValue={30} disabled={false} style={{ width: "100%" }} />

        {/* hover */}
        <Popover content={popContent} title="Title">
          <Button type="primary">Hover me</Button>
        </Popover>

        <Input placeholder="Basic usage" />

        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="medium"
          onSearch={onSearch}
        />
      </Space>
    </div>
  );
}

export default App;
