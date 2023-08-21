'use client'
import { Row, Col, Card, Descriptions, List, Button, CollapseProps, Collapse } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { updateModal } from "@/redux/actions/app";
import DishModal from "@/app/presentors/dishModal";

  //dummy data
const data = [
  'Samak Rice Kheer',
  'Kutti Atta Puri',
  'Sabudana Khichdi'
];

const UpcomingMeals: React.FC = () => {
  const dispatch = useAppDispatch();

  const openDishModal = (bool: boolean = true) => {
    dispatch(updateModal({ 
      open: bool,
      data: {
        title: 'Meal Instructions',
        footer: null,
        content: <DishModal />
      }
    }));
  }

  const renderMeals = () => {
    return ["Morning","Evening"].map((meal, index) => (
      <Col 
        xs={24}
        sm={24}
        md={24}
        key={index}
        className={`marginTop20 cursorPointer`}
        onClick={(e) => openDishModal()}
      >
        <Card title={meal} extra={'Today'} bordered={true}>
          <Descriptions bordered>
            <Descriptions.Item label="No. Of People Dining Today">27</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Meal Name">Ekadashi Prasad</Descriptions.Item>
          </Descriptions>

          <Descriptions className={`marginTop20`} bordered>
            <Descriptions.Item label="Dishes">
              <List
                size={'small'}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    {item}
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