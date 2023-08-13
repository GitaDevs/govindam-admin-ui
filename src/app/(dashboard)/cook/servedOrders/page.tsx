'use client'
import { CheckCircleOutlined, CloseCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Descriptions, Timeline } from 'antd';
import React, { useState } from 'react';

const items = [
  {
    dot: <CheckCircleOutlined className="timeline-clock-icon" />,
    color: 'green',
    children: (
      <Card title={'Morning'} extra={'Today'}>
        <Descriptions bordered>
          <Descriptions.Item label="No. Of People Dined">27</Descriptions.Item>
        </Descriptions>

        <Descriptions bordered className={`marginTop20`}>
          <Descriptions.Item label="Meal Name">Khichdi</Descriptions.Item>
        </Descriptions>

        <Descriptions bordered className={`marginTop20`}>
          <Descriptions.Item label="Meal Rating">
            4.5 <StarOutlined />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    ),
  },
  {
    dot: <CloseCircleOutlined className="timeline-clock-icon" />,
    color: 'red',
    children: (
      <Card title={'Evening'} extra={'Yesterday'}>
        <Descriptions bordered>
          <Descriptions.Item label="No. Of People Dined">{27}</Descriptions.Item>
        </Descriptions>

        <Descriptions bordered className={`marginTop20`}>
          <Descriptions.Item label="Meal Name">Khichdi</Descriptions.Item>
        </Descriptions>    

        <Descriptions bordered className={`marginTop20`}>
          <Descriptions.Item label="Meal Rating">
            3.5 <StarOutlined />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    ),    
  }
];

const CookDashboardServerOrders: React.FC = () => {
  const getTimeline = () => {
    return (
      <>
        <Timeline
          items={items}
        />
      </>
    );
  }

  return(
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50 textAlign`}>
      {/* <h3> Served Orders</h3> */}

      <div className='marginTop50'>
        {getTimeline()} 
      </div>
    </div>
  )
};

export default CookDashboardServerOrders;