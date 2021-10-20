import { Button, Slider, Space, Upload, Popconfirm, Popover} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './App.css';

const popContent = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <br/>   
      <Space direction="vertical" style={{width: "75%"}}>
        {/* buttons with space */}
        <Space>
          <Button type="primary">Button</Button>
          <Upload>
            <Button>
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
          <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
            <Button>Confirm</Button>
          </Popconfirm>
        </Space>

        {/* slider */}
        <Slider defaultValue={30} disabled={false} style={{width: "100%"}}/>

        {/* hover */}
        <Popover content={popContent} title="Title">
          <Button type="primary">Hover me</Button>
        </Popover>
      </Space>

    </div>
  );
}

export default App;
