import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSubPurchaseDetails } from "@/redux/selectors/user";
import Descriptions from "antd/es/descriptions";
import { updateModal } from "@/redux/actions/app";
import Divider from "antd/es/divider";
import Button from "antd/es/button";

interface IProps {
  subId: string | number;
}

const PaymentDetailsPage: React.FC<IProps> = ({ subId }: IProps) => {
  const dispatch = useAppDispatch();
  const paymentDetail = useAppSelector(selectSubPurchaseDetails());

  useEffect(() => {
    () => {
      dispatch(updateModal({ open: false }));
    }
  }, []);

  const makePurchaseHandler = () => {

  }

  return (
    <div>
      <Descriptions bordered className="marginTop10">
        <Descriptions.Item label="Subscription Amount" contentStyle={{fontWeight: 'bold'}}>{`Rs. ${paymentDetail?.subAmount || 0}`}</Descriptions.Item>
      </Descriptions>

      <Descriptions bordered  className="marginTop10">
        <Descriptions.Item label="Fine Amount" contentStyle={{fontWeight: 'bold'}}>{`Rs. ${paymentDetail?.fineAmount || 0}`}</Descriptions.Item>
      </Descriptions>

      <Descriptions bordered  className="marginTop10">
        <Descriptions.Item label="Tax Amount" contentStyle={{fontWeight: 'bold'}}>{`Rs. ${paymentDetail?.taxAmount || 0}`}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions bordered>
        <Descriptions.Item label="Total Amount" contentStyle={{fontWeight: 'bold'}}>{`Rs. ${paymentDetail?.totalAmount || 0}`}</Descriptions.Item>
      </Descriptions>

      <Button
        className='marginTop20'
        type="primary"
        block
        onClick={() => makePurchaseHandler()}
        disabled={true}
      >
        Make Purchase
      </Button>       
    </div>
  );
}

export default PaymentDetailsPage;