'use client'
import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import UpcomingMeals from '../../../components/upcomingMeals';
import { useAppDispatch } from '@/redux/hooks';
import { fetchMenuAndMeals } from '@/redux/thunk/menu';
import { fetchSpecialOrders } from '@/redux/thunk/order';

const tabs = ["Upcoming Meals"]
const mealComponents = [UpcomingMeals]

const CustomerDashboardHome: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenuAndMeals("upcoming"));
    dispatch(fetchSpecialOrders());
  }, []);

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

export default CustomerDashboardHome;