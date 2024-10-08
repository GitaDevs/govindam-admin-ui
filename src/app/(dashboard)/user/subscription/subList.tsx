'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectAllSubs } from '@/redux/selectors/user';
import { getSubscriptionList, validateSubPaymentDetails } from '@/redux/thunk/user';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Statistic from 'antd/es/statistic';
import Button from "antd/es/button";
import Card from "antd/es/card";
import Row from "antd/es/row";
import Col from "antd/es/col";
import React, { useEffect } from 'react';
import { updateModal } from '@/redux/actions/app';
import PaymentDetailsPage from './paymentDetails';

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
          <CloseCircleOutlined style={{ color: 'red' }}/> {name}
        </div>
      );
    }

    return (
      <div>
        <CheckCircleOutlined style={{ color: 'green' }} /> {name}
      </div>
    );
  }

  const purchaseSubscriptionHandler = (subId?: number) => {
    if(!subId) return;

    dispatch(validateSubPaymentDetails(subId));

    dispatch(updateModal({ 
      open: true,
      data: {
        title: 'Payment Details',
        footer: null,
        content: <PaymentDetailsPage subId={subId} />,
      }
    }));
  }

  const renderSubList = () => {
    return (subscriptionList || []).map((sub, index) => (
      <Col key={index} md={24} sm={24} xs={24} className='marginTop20'>
        <Card title={sub?.name}>
          {sub?.description}

          <div className='marginTop10'>
            {renderMealIncluded("Breakfast", sub?.breakfast || false)}
            {renderMealIncluded("Lunch", sub?.lunch || false)}
            {renderMealIncluded("Dinner", sub?.dinner || false)}
          </div>

          <div className='marginTop20'>
            <Statistic title="Pricing" value={`Rs. ${sub?.price || 0}`} />
          </div>

          <div className='marginTop10'>
            <Statistic title="Validity" value={`${sub?.validDays} days`} />
          </div>

          <Button
            className='marginTop20'
            type="primary"
            block
            onClick={() => purchaseSubscriptionHandler(sub?.id)}
          >
            Purchase Now
          </Button>          
        </Card>
      </Col>
    ))
  }

  return (
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50`}>
      <Row>
        {renderSubList()}
      </Row>
    </div>
  );
}

export default SubList;