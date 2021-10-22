import { Button, Row, Col, notification, Typography } from "antd";
import React from "react";
import "../App.css";

const { Text } = Typography;

function limit(string) {
  if (string.length > 37) {
    return string.substring(0, 37) + "...";
  }
  return string;
}

function MobileTable(props) {
  const item = props.item;
  return (
    <Row justify="start" style={{ width: "100%" }}>
      <Col span={16} style={{ textAlign: "left" }}>
        <Text strong>{limit(item.destination)}</Text>
      </Col>
      <Col span={8} style={{ textAlign: "right" }}>
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
        </Button>
      </Col>
      <Col span={24} style={{ textAlign: "left", backgroundColor: "white" }}>
        <Text strong>
          <a href={item.shorten} target="_blank" rel="noreferrer">
            {item.shorten}
          </a>
        </Text>
      </Col>
    </Row>
  );
}

function Table(props) {
  const item = props.item;
  return (
    <div
      style={{
        backgroundColor: "",
        width: "100%",
        display: "flex",
      }}
    >
      <Text strong style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        {limit(item.destination)}
      </Text>
      <Text strong style={{ marginLeft: "auto" }}>
        <a href={item.shorten} target="_blank" rel="noreferrer">
          {item.shorten}
        </a>
      </Text>
    </div>
  );
}

export { Table, MobileTable };
