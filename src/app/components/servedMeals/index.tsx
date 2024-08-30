'use client'
import { capitalize, getMealDate, getMealDay, sortMealsInDescOrder } from '@/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFeedbackList } from '@/redux/selectors/feedback';
import { selectMenuLoading, selectServedOrders } from '@/redux/selectors/menu';
import { selectUserRoleType } from '@/redux/selectors/user';
import { fetchFeedbacks } from '@/redux/thunk/feedback';
import { fetchMenuAndMeals } from '@/redux/thunk/menu';
import { Meal } from '@/redux/types/menu';
import { COOK, CUSTOMER } from '@/redux/types/user';
import {  CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import Card from 'antd/es/card';
import Descriptions from 'antd/es/descriptions';
import Rate from 'antd/es/rate';
import Timeline from 'antd/es/timeline';
import React, { useEffect } from 'react';
import Rating from '../rating';

const ServedMeals: React.FC = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(selectUserRoleType());
  const isMenuLoading = useAppSelector(selectMenuLoading());
  const servedMeals = useAppSelector(selectServedOrders());
  
  useEffect(() => {
    dispatch(fetchMenuAndMeals("served"));

    if(userRole === CUSTOMER) {
      dispatch(fetchFeedbacks());
    }
  }, []);

  const renderServedMeals = () => {
    let allMeals: Meal[] = []; 

    servedMeals.forEach(menu => {
      allMeals = [...allMeals, ...(menu?.meals || [])];
    })

    sortMealsInDescOrder(allMeals);

    return allMeals.slice(0, 4).map((meal, index) => {
      return {
        dot: <CheckCircleOutlined className="timeline-clock-icon" />,
        color: 'green',
        children: (
          <Card 
            headStyle={{textAlign: "left"}}
            title={`${getMealDate(meal.servingDate)}(${getMealDay(meal.servingDate)})`} 
            extra={`${capitalize(meal.servingTime)}`}
          >
            <Descriptions bordered>
              <Descriptions.Item label="Meal Name">{meal.name}</Descriptions.Item>
            </Descriptions>

            {
              userRole === COOK && (
                <>
                  <Descriptions bordered className={`marginTop20`}>
                    <Descriptions.Item label="No. Of People Dined">{meal.peopleDining || 0}</Descriptions.Item>
                  </Descriptions>
          
                  <Descriptions bordered className={`marginTop20`}>
                    <Descriptions.Item label="Meal Rating">
                      <Rate
                        allowHalf
                        value={meal?.rating || 0}
                        disabled={true}
                      />
                    </Descriptions.Item>
                  </Descriptions>                
                </>
              )
            }

            <Rating meal={meal} />
          </Card>
        ),
      }
    })
  }

  const getTimeline = () => {
    if(isMenuLoading) {
      return <LoadingOutlined />
    }

    return (
      <>
        <Timeline
          items={renderServedMeals()}
        />
      </>
    );
  }

  return(
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50 textAlign`}>
      <h3> Served Orders</h3>

      <div className='marginTop50'>
        {getTimeline()} 
      </div>
    </div>
  )
};

export default ServedMeals;