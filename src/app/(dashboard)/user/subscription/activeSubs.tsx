'use client'
import { useAppSelector } from '@/redux/hooks';
import { selectUserSubs } from '@/redux/selectors/user';
import React from 'react';
import Result from 'antd/es/result';
import { DateTime } from 'luxon';

const ActiveSubs: React.FC = () => {
  const userSubscription = useAppSelector(selectUserSubs());

  const renderDateFormat = (date: string): string => {
    return DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('yyyy LLL dd')
  }

  if(userSubscription.id) {
    return (<>
      <Result
        status="success"
        title="Your Subscription is Active"
        subTitle={`Subscription valid from ${renderDateFormat(userSubscription.starts || "")} to ${renderDateFormat(userSubscription.ends || "")}`}
        extra={[
          // <Button type="primary" key="console">
          //   Go Console
          // </Button>,
          // <Button key="buy">Buy Again</Button>,
        ]}
      />
    </>);
  } else {
    return (<>
      <Result
        status="error"
        title="Your have no active subscription"
        subTitle={`Buy one to activate!`}
        extra={[
          // <Button type="primary" key="console">
          //   Go Console
          // </Button>,
          // <Button key="buy">Buy Again</Button>,
        ]}
      />    
    </>)
  }
}

export default ActiveSubs;