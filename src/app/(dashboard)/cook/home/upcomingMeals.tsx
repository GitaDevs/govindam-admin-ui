'use client'
import { Row, Col, Card, Descriptions, List, Button, CollapseProps, Collapse } from "antd";
import style from "./style.module.css"
import { useAppDispatch } from "@/redux/hooks";
import { updateModal } from "@/redux/actions/app";

  //dummy data
const data = [
  'Samak Rice Kheer',
  'Kutti Atta Puri',
  'Sabudana Khichdi'
];

const UpcomingMeals: React.FC = () => {
  const dispatch = useAppDispatch();

  const collapsableMenu = () => {
    const items: CollapseProps['items'] = [
      {
        key: '1',
        label: 'Dynamic Ingredients Table',
        children: getDynamicIngredientsTable(),
      },
      {
        key: '2',
        label: 'Text Instructions',
        children: getMealTextInstruction(),
      },
      {
        key: '3',
        label: 'Video Instructions',
        children: getMealVideoLink(),
      }      
    ];

    return (
      <Collapse items={items} defaultActiveKey={['1']} />
    )
  }

  const getMealVideoLink = () => (
    <>
      <Button type="link">
        Link
      </Button>
    </>
  )

  const getMealTextInstruction = () => (
    <>
      A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
    </>
  )

  const getDynamicIngredientsTable = () => (
    <>
      <Descriptions layout="vertical" bordered size="small" className={style.marginTop10}>
        <Descriptions.Item label="1). Samak Rice Kheer" labelStyle={{ fontWeight: 'bold'}}>
          <List
            size={'small'}
            dataSource={['Samak Rice', 'Milk']}
            renderItem={item => (
            <List.Item>
              <span>
                {item}
              </span>
              <span className={style.floatRight}>
                {'2 Cups'}
              </span>
            </List.Item>
            )}
          >
          </List>          
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="vertical" bordered size="small" className={style.marginTop10}>
        <Descriptions.Item label="2). Kuttu Atta Puri" labelStyle={{ fontWeight: 'bold'}}>
          <List
            size={'small'}
            dataSource={['Kuttu Atta', 'Oil']}
            renderItem={item => (
            <List.Item>
              <span>
                {item}
              </span>
              <span className={style.floatRight}>
                {'2 Cups'}
              </span>              
            </List.Item>
            )}
          >
          </List>          
        </Descriptions.Item>
      </Descriptions>
    </>
  )

  const openDishModal = (bool: boolean = true) => {
    dispatch(updateModal({ 
      open: bool,
      data: {
        title: 'Meal Instructions',
        footer: null,
        content: collapsableMenu()
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
        className={`${style.marginTop20} ${style.cursorPointer}`}
        onClick={(e) => openDishModal()}
      >
        <Card title={meal} extra={'Today'} bordered={true}>
          <Descriptions bordered>
            <Descriptions.Item label="No. Of People Dining Today">27</Descriptions.Item>
          </Descriptions>

          <Descriptions className={style.marginTop20} bordered>
            <Descriptions.Item label="Meal Name">Ekadashi Prasad</Descriptions.Item>
          </Descriptions>

          <Descriptions className={style.marginTop20} bordered>
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
    <Row className={`${style.margin10}`}>
      { renderMeals() }
    </Row>
  )
}

export default UpcomingMeals;