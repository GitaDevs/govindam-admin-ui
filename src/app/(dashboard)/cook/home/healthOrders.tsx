'use client'

import { Row, Col, Card, Descriptions, List, Button } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"

const HealthOrders: React.FC = () => {

  const renderUserRequestedMeals = () => {
    return ["Morning","Evening"].map((meal, index) => (
      <Col 
        xs={24}
        sm={24}
        md={24}
        key={index}
        className={`marginTop20`}
      >
        <Card title={meal} extra={'Today'} bordered={true}>
          <Descriptions bordered>
            <Descriptions.Item label="Customer Name">Aakash Singh</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Health Issue">Suffering from High Fever</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Meal Requested">Khichdi</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Instructions">Keep it lite</Descriptions.Item>
          </Descriptions>

          <div className={`marginTop20 floatRight`}>
            <Button className={`marginRight10 successGreen`} type="primary" icon={<CheckCircleOutlined />}>
              Accept
            </Button>

            <Button type="primary" icon={<CloseCircleOutlined />} danger>
              Reject
            </Button>
          </div>
        </Card>
      </Col>
    ))
  }

  return (
    <>
      <Row className={`margin10`}>
        { renderUserRequestedMeals() }
      </Row>    
    </>
  )
}

export default HealthOrders;