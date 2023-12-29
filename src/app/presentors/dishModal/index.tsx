'use client'
import { Dish } from "@/redux/types/menu";
import { Button, Collapse, CollapseProps, Descriptions, List } from "antd";

const DishModal: React.FC<{ dishes: Dish[] }> = ({ dishes }) => {

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
      <Descriptions layout="vertical" bordered size="small" className={`marginTop10`}>
        <Descriptions.Item label={`Dishes`} labelStyle={{ fontWeight: 'bold'}}>
          <List
            size="small"
            dataSource={dishes}
            renderItem={dish => (
              <List.Item>
                <span>
                  {dish.name}
                </span>
                <span className="floatRight">
                  <Button type="link" target="_blank" href={dish.videoLink}>
                    Link
                  </Button>
                </span>
              </List.Item>
            )}
          >            
          </List>
        </Descriptions.Item>    
      </Descriptions>    
    </>    
  )

  const getMealTextInstruction = () => (
    <>
      {
        dishes.map((dish, index) => (
          <Descriptions key={index} layout="vertical" bordered size="small" className={`marginTop10`}>
            <Descriptions.Item key={index} label={`${dish.name}`} labelStyle={{ fontWeight: 'bold'}}>
              {dish.textInstructions}
            </Descriptions.Item>
          </Descriptions>
        ))
      }
    </>
  )

  const getDynamicIngredientsTable = () => (
    <Descriptions layout="vertical" bordered size="small" className={`marginTop10`}>
      <Descriptions.Item label={`Dishes`} labelStyle={{ fontWeight: 'bold'}}>
        <List
          size={'small'}
          dataSource={dishes}
          renderItem={dish => (
          <List.Item>
            <span>
              {dish.name}
            </span>
            <span className={`floatRight`}>
              {`${dish?.servingSize || 0} ${dish?.unit?.name}`}
            </span>
          </List.Item>
          )}
        >
        </List>
      </Descriptions.Item>
    </Descriptions>
  )

  return collapsableMenu();
}

export default DishModal;