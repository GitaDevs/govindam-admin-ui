'use client'
import { Col, Row, Space, Tabs } from 'antd';
import React from 'react';
import style from "./style.module.css";
import UpcomingMeals from './upcomingMeals';
import HealthOrders from './healthOrders';

const tabs = ["Upcoming Meals", "Health Orders"]
const mealComponents = [UpcomingMeals, HealthOrders]

const CookDashboardHome: React.FC = () => {

  return(
    <Space className={style.padding50}>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="1"
            type="card"
            size={"large"}
            items={tabs.map((name, i) => {
              const id = String(i + 1);
              const Component = mealComponents[i];

              return {
                label: name,
                key: id,
                children: <Component />
              };
            })}
          />        
        </Col>
      </Row>
    </Space>
  )
};

export default CookDashboardHome;