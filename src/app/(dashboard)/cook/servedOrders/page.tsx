'use client'
import { capitalize, getMealDate, getMealDay } from '@/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectServedOrders } from '@/redux/selectors/menu';
import { fetchMenuAndMeals } from '@/redux/thunk/menu';
import { Meal } from '@/redux/types/menu';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Card, Descriptions, Rate, Timeline } from 'antd';
import React, { useEffect } from 'react';

const CookDashboardServerOrders: React.FC = () => {
  const dispatch = useAppDispatch();
  const servedMeals = useAppSelector(selectServedOrders());

  useEffect(() => {
    dispatch(fetchMenuAndMeals("served"));
  }, []);

  const renderServedMeals = () => {
    let allMeals: Meal[] = []; 

    servedMeals.forEach(menu => {
      allMeals = [...allMeals, ...(menu?.meals || [])];
    })

    return allMeals.map((meal, index) => {
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

            <Descriptions bordered className={`marginTop20`}>
              <Descriptions.Item label="No. Of People Dined">{0}</Descriptions.Item>
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
          </Card>
        ),
      }
    })
  }

  const getTimeline = () => {
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

export default CookDashboardServerOrders;