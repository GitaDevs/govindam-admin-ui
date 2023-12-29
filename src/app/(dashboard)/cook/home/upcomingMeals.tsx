'use client'
import { Row, Col, Card, Descriptions, List, Button, CollapseProps, Collapse } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateModal } from "@/redux/actions/app";
import DishModal from "@/app/presentors/dishModal";
import { selectUpcomingMeals } from "@/redux/selectors/menu";
import { Dish, Meal } from "@/redux/types/menu";
import { DateTime } from "luxon";
import { getMealDate, getMealDay } from "@/lib/helpers";

export const WEEK_DAYS = [
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
];

const UpcomingMeals: React.FC = () => {
  const dispatch = useAppDispatch();
  const upcomingMeals = useAppSelector(selectUpcomingMeals());

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

  const renderMeals = () => {
    let allMeals: Meal[] = []; 

    upcomingMeals.forEach(menu => {
      allMeals = [...allMeals, ...(menu?.meals || [])];
    })

    return allMeals.map((meal, index) => (
      <Col 
        xs={24}
        sm={24}
        md={24}
        key={index}
        className={`marginTop20 cursorPointer`}
        onClick={(e) => openDishModal(meal.dishes)}
      >
        <Card title={getMealDate(meal.servingDate)} extra={getMealDay(meal.servingDate)} bordered={true}>
          <Descriptions bordered>
            <Descriptions.Item label="Meal Name" contentStyle={{fontWeight: 'bold'}}>{meal.name || ""}</Descriptions.Item>
          </Descriptions>

          <Descriptions bordered className={`marginTop20`}>
            <Descriptions.Item label="No. Of People Dining Today">0</Descriptions.Item>
          </Descriptions>

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
        </Card>
      </Col>
    ))
  }

  return (
    <Row className={`margin10`}>
      { renderMeals() }
    </Row>
  )
}

export default UpcomingMeals;