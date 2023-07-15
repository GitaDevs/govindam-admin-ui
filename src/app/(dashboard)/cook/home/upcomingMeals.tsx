'use client'
import { Row, Col, Space, Card } from "antd";
import style from "./style.module.css"

const UpcomingMeals: React.FC = () => {

  const renderMeals = () => {
    return ["Morning","Evening"].map((meal, index) => (
      <Col sm={24} md={24} key={index} className={`w-100 ${style.marginBottom10}`}>
        <Card title={meal}>
          Card content
        </Card>
      </Col>
    ))
  }

  return (
    <Row className={style.padding50} gutter={8}>
      { renderMeals() }
    </Row>
  )
}

export default UpcomingMeals;