'use client'

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectSpecialOrders } from "@/redux/selectors/order"
import { capitalize, getMealDate, getMealDay } from "@/lib/helpers"
import { updateSpecialOrderThunk } from "@/redux/thunk/order"
import { DateTime } from "luxon"
import Button from "antd/es/button";
import Tag from "antd/es/tag";
import Descriptions from "antd/es/descriptions";
import Card from "antd/es/card";
import Col from "antd/es/col";
import Row from "antd/es/row";

const HealthOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const specialOrders = useAppSelector(selectSpecialOrders());
  
  const updateOrder = (id: string, accept: boolean) => {
    dispatch(updateSpecialOrderThunk(id, { isAccepted: accept }));
  }

  const showTag = (isAccepted: boolean, processedAt?: Date) => {
    if(isAccepted === null) return;

    const time = processedAt ? 
      DateTime.fromJSDate(new Date(processedAt)).toRelative()
    : null;

    if(isAccepted) {
      return (
        <div className="marginTop20 floatRight">
          <Tag color="green">Accepted</Tag>
          {time}
        </div>        
      )
    } else {
      return (
        <div className="marginTop20 floatRight">
          <Tag color="red">Rejected</Tag>
          {time}
        </div>        
      )
    }
  }

  const renderUserRequestedMeals = () => {
    return specialOrders.map((order, index) => (
      <Col 
        xs={24}
        sm={24}
        md={24}
        key={index}
        className={`marginTop20`}
      >
        <Card
          title={`${getMealDate(order.meal.servingDate)}(${getMealDay(order.meal.servingDate)})`}
          extra={capitalize(order.meal.servingTime)} 
          bordered={true}
        >
          <Descriptions bordered>
            <Descriptions.Item label="Customer Name">{order.user.username}</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Health Issue">{order.healthIssue}</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Instructions">{order.mealInstructions}</Descriptions.Item>
          </Descriptions>

          {showTag(order.isAccepted, order.processedAt)}

          {
            (order.isAccepted == null) &&
            (
              <div className={`marginTop20 floatRight`}>
                <Button 
                  className={`marginRight10 successGreen`} 
                  type="primary" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => updateOrder(order.id, true)}
                >
                  Accept
                </Button>
    
                <Button
                  type="primary" 
                  icon={<CloseCircleOutlined />} 
                  danger
                  onClick={() => updateOrder(order.id, false)}
                >
                  Reject
                </Button>
              </div>              
            )
          }
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