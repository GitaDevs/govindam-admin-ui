'use client'
import Tabs from 'antd/es/tabs';
import React, { useEffect } from 'react';
import UpcomingMeals from '../../../components/upcomingMeals';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenuAndMeals } from '@/redux/thunk/menu';
import { fetchSpecialOrders } from '@/redux/thunk/order';
import { isUserSubscribed, selectUserLoading } from '@/redux/selectors/user';
import { redirect } from 'next/navigation';

const tabs = ["Upcoming Meals"]
const mealComponents = [UpcomingMeals]

const CustomerDashboardHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const userSubscribed = useAppSelector(isUserSubscribed());
  const userLoading = useAppSelector(selectUserLoading());

  useEffect(() => {
    if(!userSubscribed && !userLoading) {
      redirect("/user/subscription");
    };
  }, [userSubscribed, userLoading]);

  useEffect(() => {
    if(!userSubscribed) return;

    dispatch(fetchMenuAndMeals("upcoming"));
    dispatch(fetchSpecialOrders());
  }, [userSubscribed]);

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