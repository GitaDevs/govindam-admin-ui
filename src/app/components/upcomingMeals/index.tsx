'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateModal } from "@/redux/actions/app";
import DishModal from "@/app/presentors/dishModal";
import { selectMenuLoading, selectUpcomingMeals } from "@/redux/selectors/menu";
import { Dish, Meal } from "@/redux/types/menu";
import { capitalize, getMealDate, getMealDay } from "@/lib/helpers";
import { selectUserRoleType } from "@/redux/selectors/user";
import { COOK, CUSTOMER } from "@/redux/types/user";
import { CheckCircleOutlined, CloseCircleOutlined, CommentOutlined, DownOutlined, LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef } from "react";
import { createSpecialOrder } from "@/redux/thunk/order";
import { selectSpecialOrders } from "@/redux/selectors/order";
import { SpecialOrder } from "@/redux/types/order";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Descriptions from "antd/es/descriptions";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Input from "antd/es/input";
import List from "antd/es/list";
import Tag from "antd/es/tag";
import Dropdown from "antd/es/dropdown";
import Space from "antd/es/space";
import { MenuProps } from "antd";
import Rating from "../rating";
import { fetchFeedbacks } from "@/redux/thunk/feedback";

export const WEEK_DAYS = [
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
];

const UpcomingMeals: React.FC = () => {
  const dispatch = useAppDispatch();
  const upcomingMeals = useAppSelector(selectUpcomingMeals());
  const orders = useAppSelector(selectSpecialOrders());
  const userRole = useAppSelector(selectUserRoleType());
  const isMenuLoading = useAppSelector(selectMenuLoading());
  const mealInstRef = useRef(null);
  const healthIssueRef = useRef(null);

  useEffect(() => {
    if(userRole === CUSTOMER) {
      dispatch(fetchFeedbacks());
    }
  }, []);

  const openDishModal = (dishes: Dish[]) => {
    dispatch(updateModal({ 
      open: true,
      data: {
        title: 'Meal Instructions',
        footer: null,
        content: <DishModal dishes={dishes}/>,
      }
    }));
  }

  const getPropsByRole = (meal: Meal) => {
    if(userRole === COOK) {
      return {
        className: `marginTop20 cursorPointer`,
        onClick: (e: any) => openDishModal(meal.dishes)
      }
    }

    return {
      className: "marginTop20"
    };
  }

  const handleOk = (mealId: number, type: "cancel" | "request") => {
    if(type === "cancel") {
      dispatch(createSpecialOrder({
        mealId,
        isCancelled: true
      }))
    } else {
      const healthIssue = (healthIssueRef.current as any)?.input?.value;
      const mealInst = (mealInstRef.current as any)?.resizableTextArea?.textArea?.value;

      dispatch(createSpecialOrder({
        mealId,
        healthIssue: healthIssue,
        mealInstructions: mealInst
      }))
    }
  }

  const updateOrder = (mealId: number, type: "cancel" | "request") => {
    const title = type === "cancel" ? "Do you want to cancel order ?" : "Do you want to request a new health order ?";
    const content = type === "request" ? 
      <>
        <Input 
          placeholder={"Health Issues"} 
          size="large"
          ref={healthIssueRef}
        />
        <TextArea
          ref={mealInstRef}
          className="marginTop20" 
          rows={4}
          placeholder="How should we prepare your meal ?" 
        />
      </> : null;

    dispatch(updateModal({ 
      open: true,
      data: {
        title,
        content: <>{content}</>,
        onOk: () => {
          handleOk(mealId, type);
          dispatch(updateModal({ open: false })); 
        },
        onCancel: () => { dispatch(updateModal({ open: false })); }
      }
    }));
  }

  const renderOrderTag = (orderExist: SpecialOrder) => {
    if(userRole !== CUSTOMER) return;

    if(orderExist.isCancelled) {
      return (
        <div className="marginTop10">
          <Tag color="orange">Cancelled</Tag>
        </div>
      )
    } else if(orderExist.isAccepted) {
      return (
        <div className="marginTop10">
          <Tag color="green">Order Accepted By Cook</Tag>
        </div>        
      )
    } else {
      return (
        <div className="marginTop10">
          <Tag color="yellow">Waiting for Cook to Accept</Tag>
        </div>
      )
    }
  }

  const isMealProcessed = (mealId: number | string, render = false) => {
    const orderExist = orders.find(order => {
      return order.meal.id === mealId
    });

    if(!orderExist) return;

    if(render) return renderOrderTag(orderExist);
    return true;
  }
  
  const getMealActions = (meal: Meal) => {
    if(userRole === COOK) return "";

    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div role="button" onClick={() => updateOrder(meal.id, "request")}>
            Request Health Order
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div role="button" onClick={() => updateOrder(meal.id, "cancel")}>
            Cancel Order
          </div>
        ),
      },
    ];

    return (
      <Space wrap>
        <Dropdown 
          disabled={!!isMealProcessed(meal.id)} 
          trigger={['click']} menu={{ items }} 
          placement="bottomLeft"
        >
          <Button
            icon={<MoreOutlined />}
          >
          </Button>
        </Dropdown>
      </Space>
    );
  }

  const renderMeals = () => {
    let allMeals: Meal[] = []; 

    upcomingMeals.forEach(menu => {
      allMeals = [...allMeals, ...(menu?.meals || [])];
    })

    return allMeals.slice(0, 4).map((meal, index) => (
      <Col 
        xs={24}
        sm={24}
        md={24}
        key={index}
        {...getPropsByRole(meal)}
      >
        <Card 
          title={`${getMealDate(meal.servingDate)}(${capitalize(meal.servingTime)})`}
          extra={getMealActions(meal)} 
          bordered={true}
        >
          <Descriptions bordered>
            <Descriptions.Item label="Meal Name" contentStyle={{fontWeight: 'bold'}}>{meal.name || ""}</Descriptions.Item>
          </Descriptions>

          {
            userRole === COOK && (
              <Descriptions bordered className={`marginTop20`}>
                <Descriptions.Item label="No. Of People Dining Today">{meal.peopleDining}</Descriptions.Item>
              </Descriptions>
            )
          }

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Dishes">
              <List
                size={'small'}
                dataSource={meal.dishes}
                renderItem={dish => (
                  <List.Item>
                    {dish.name}
                  </List.Item>
                )}
              >
              </List>
            </Descriptions.Item>
          </Descriptions>

          {isMealProcessed(meal.id, true)}
          <Rating meal={meal} />
        </Card>
      </Col>
    ))
  }

  if(isMenuLoading) {
    return <LoadingOutlined />
  }

  return (
    <Row className={`margin10`}>
      { renderMeals() }
    </Row>
  )
}

export default UpcomingMeals;