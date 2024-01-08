'use client'
import { useAppSelector } from '@/redux/hooks';
import { isUserSubscribed } from '@/redux/selectors/user';
import React, { useEffect } from 'react';
import ActiveSubs from './activeSubs';
import SubList from './subList';

const CustomerSubscription: React.FC = () => {
  const userSubscribed = useAppSelector(isUserSubscribed());

  if(userSubscribed) {
    return <ActiveSubs />
  } else {
    return <SubList />
  }
}

export default CustomerSubscription;