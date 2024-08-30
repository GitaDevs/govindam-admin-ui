import { MEAL_TIMING_WINDOW, mealDisappearTimingLimits } from "@/app/helpers/constants";
import { updateModal } from "@/redux/actions/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFeedbackList } from "@/redux/selectors/feedback";
import { selectUserRoleType } from "@/redux/selectors/user";
import { createFeedback, ICreateFeedbackBody } from "@/redux/thunk/feedback";
import { Meal, MORNING } from "@/redux/types/menu";
import { CUSTOMER } from "@/redux/types/user";
import { CommentOutlined } from "@ant-design/icons";
import Rate from "antd/es/rate";
import Button from "antd/es/button";
import TextArea from "antd/es/input/TextArea";
import { DateTime } from "luxon";
import React from "react";

interface IRatingProps {
  meal: Meal;
}

const Rating: React.FC<IRatingProps> = (props: IRatingProps) => {
  const { meal } = props;
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(selectUserRoleType());
  const userFeedbacks = useAppSelector(selectFeedbackList());
  let localRating = 0;
  let localComment = "";

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
  
  const canMealBeRated = (): boolean => {
    const { servingDate, servingTime } = meal;

    const limit = mealDisappearTimingLimits[servingTime];
    const startDateTime = DateTime.fromFormat(`${servingDate} ${limit}`, 'yyyy-MM-dd hh:mm a').minus({ hours: MEAL_TIMING_WINDOW });

    return (DateTime.local() > startDateTime);
  }

  if(userRole !== CUSTOMER || !canMealBeRated()) return null;

  return (
    <>
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
    </>
  );
}

export default React.memo(Rating);
