'use client'
import { Row, Col, Card, Descriptions, List } from "antd";
import style from "./style.module.css"

  //dummy data
const data = [
  'Samak Rice Kheer',
  'Kutti Atta Puri',
  'Sabudana Khichdi'
];

const UpcomingMeals: React.FC = () => {

  const renderMeals = () => {
    return ["Morning","Evening"].map((meal, index) => (
      <Col xs={24} sm={24} md={24} key={index} className={`${style.marginTop20}`}>
        <Card title={meal} extra={'Today'} bordered={true}>
          <Descriptions bordered>
            <Descriptions.Item label="No. Of People Dining Today">27</Descriptions.Item>
          </Descriptions>

          <Descriptions className={style.marginTop20} bordered>
            <Descriptions.Item label="Meal Name">Ekadashi Prasad</Descriptions.Item>
          </Descriptions>

          <Descriptions className={style.marginTop20} bordered>
            <Descriptions.Item label="Dishes">
              <List
                size={'small'}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              >
              </List>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    ))
  }

  return (
    <Row className={`${style.margin10}`}>
      { renderMeals() }
    </Row>
  )
}

export default UpcomingMeals;