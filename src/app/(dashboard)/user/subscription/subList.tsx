'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAllSubs } from '@/redux/selectors/user';
import { getSubscriptionList } from '@/redux/thunk/user';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';

const SubList: React.FC = () => {
  const dispatch = useAppDispatch();
  const subscriptionList = useAppSelector(selectAllSubs());

  useEffect(() => {
    dispatch(getSubscriptionList());
  }, []);

  const renderMealIncluded = (name: string, included: boolean) => {
    if(!included) {
      return (
        <div>
          <CloseCircleOutlined color='red'/> {name}
        </div>
      );
    }

    return (
      <div>
        <CheckCircleOutlined color={'green'} /> {name}
      </div>
    );
  }

  const renderSubList = () => {
    return (subscriptionList || []).map((sub, index) => (
      <Col key={index} md={24} sm={24} xs={24} className='marginTop20'>
        <Card title={sub?.name}>
          {sub?.description}

          <div className='marginTop10'>
            {renderMealIncluded("Breakfast", sub?.breakfast || false)}
            {renderMealIncluded("Dinner", sub?.dinner || false)}
          </div>

          <div className='marginTop20'>
            Pricing <b>Rs.{sub?.price || 0}</b>
          </div>

          <div className='marginTop10'>
            {`Valid for ${sub?.validDays} days`}
          </div>
        </Card>
      </Col>
    ))
  }

  return (
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50`}>
      <Row gutter={16}>
        {renderSubList()}
      </Row>
    </div>
  );
}

export default SubList;