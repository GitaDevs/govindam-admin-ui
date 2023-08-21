'use client'
import { Tabs } from 'antd';
import React from 'react';
import UpcomingMeals from './upcomingMeals';
import HealthOrders from './healthOrders';

const tabs = ["Upcoming Meals", "Health Orders"]
const mealComponents = [UpcomingMeals, HealthOrders]

const CookDashboardHome: React.FC = () => {

  return(
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50`}>
      <Tabs
        centered={true}
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
    </div>
  )
};

export default CookDashboardHome;