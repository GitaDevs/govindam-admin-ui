'use client'
import { capitalize, getMealDate, getMealDay, sortMealsInDescOrder } from '@/lib/helpers';
import { updateModal } from '@/redux/actions/app';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFeedbackList } from '@/redux/selectors/feedback';
import { selectServedOrders } from '@/redux/selectors/menu';
import { selectUserRoleType } from '@/redux/selectors/user';
import { createFeedback, fetchFeedbacks, ICreateFeedbackBody } from '@/redux/thunk/feedback';
import { fetchMenuAndMeals } from '@/redux/thunk/menu';
import { Meal } from '@/redux/types/menu';
import { CUSTOMER } from '@/redux/types/user';
import {  CheckCircleOutlined, CommentOutlined } from '@ant-design/icons';
import Button from "antd/es/button";
import Card from 'antd/es/card';
import Descriptions from 'antd/es/descriptions';
import TextArea from 'antd/es/input/TextArea';
import Rate from 'antd/es/rate';
import Timeline from 'antd/es/timeline';
import React, { useEffect, useRef, useState } from 'react';

const ServedMeals: React.FC = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(selectUserRoleType());
  const servedMeals = useAppSelector(selectServedOrders());
  const userFeedbacks = useAppSelector(selectFeedbackList());
  let localRating = 0;
  let localComment = "";
  
  useEffect(() => {
    dispatch(fetchMenuAndMeals("served"));

    if(userRole === CUSTOMER) {
      dispatch(fetchFeedbacks());
    }
  }, []);

  const handleOk = (mealId: number) => {
    const body: ICreateFeedbackBody = {
      comment: localComment,
      rating: localRating,
      mealId,
    }

    dispatch(createFeedback(body));
  }

  const giveFeedback = (mealId: number) => {
    const feedback = isFeedbackGivenForThisMeal(mealId);
    const feedbackGiven = !!feedback;

    const content =
      <>
        <Rate
          allowClear
          className="marginTop20"
          onChange={(value) => {
            localRating = value;
          }}
          value={feedbackGiven ? feedback.rating : undefined}
          disabled={feedbackGiven}
        />
        <TextArea
          className="marginTop20" 
          rows={4}
          required={true}
          placeholder="Give your feedback here!"
          value={feedbackGiven ? feedback.comment : undefined}
          onChange={(e) => {
            localComment = e.target.value;
          }}
          disabled={feedbackGiven}
        />
      </>;

    dispatch(updateModal({ 
      open: true,
      data: {
        title: 'Help Us Improve!',
        content: <>{content}</>,
        okButtonProps: {
          disabled: feedbackGiven
        },
        onOk: () => {
          handleOk(mealId);
          dispatch(updateModal({ open: false })); 
        },
        onCancel: () => { dispatch(updateModal({ open: false })); }
      }
    }));
  }
  
  const isFeedbackGivenForThisMeal = (mealId: number) => {
    return userFeedbacks.find(feedback => feedback.meal.id === mealId);
  }

  const renderServedMeals = () => {
    let allMeals: Meal[] = []; 

    servedMeals.forEach(menu => {
      allMeals = [...allMeals, ...(menu?.meals || [])];
    })

    sortMealsInDescOrder(allMeals);

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

            {
              userRole === CUSTOMER &&
              (
                <div className={`marginTop20 floatRight`}>
                  <Button
                    className={`marginRight10`} 
                    type="primary" 
                    icon={<CommentOutlined />}
                    onClick={() => giveFeedback(meal.id)}
                  >
                    Give Feedback
                  </Button>
                </div>
              )
            }
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

export default ServedMeals;