'use client'
import { Dish } from "@/redux/types/menu";
import { Button, Collapse, CollapseProps, Descriptions, List } from "antd";

const DishModal: React.FC<{ dishes: Dish[] }> = ({ dishes }) => {

  const collapsableMenu = () => {
    const items: CollapseProps['items'] = dishes.map(dish => ({
      key: dish.id,
      label: dish.name,
      children: (
        <>
          {getDynamicIngredientsTable(dish)}
          {getMealTextInstruction(dish)}
          {getMealVideoLink(dish)}
        </>
      )
    }))

    return (
      <Collapse items={items} defaultActiveKey={['1']} />
    )
  }

  const getMealVideoLink = (dish: Dish) => (
    <>
      <Descriptions layout="vertical" bordered size="small" className={`marginTop10`}>
        <Descriptions.Item label={`Video Link`} labelStyle={{ fontWeight: 'bold'}}>
          <span>
            <Button type="link" target="_blank" href={dish.videoLink}>
              See Video
            </Button>
          </span>
        </Descriptions.Item>    
      </Descriptions>    
    </>    
  )

  const getMealTextInstruction = (dish: Dish) => (
    <>
      {
        <Descriptions key={dish.id} layout="vertical" bordered size="small" className={`marginTop10`}>
          <Descriptions.Item key={dish.id} label={`Text Instructions`} labelStyle={{ fontWeight: 'bold'}}>
            {dish.textInstructions}
          </Descriptions.Item>
        </Descriptions>
      }
    </>
  )

  const getDynamicIngredientsTable = (dish: Dish) => (
    <Descriptions layout="vertical" bordered size="small" className={`marginTop10`}>
      <Descriptions.Item label={`Raw Items`} labelStyle={{ fontWeight: 'bold'}}>
        <List
          size={'small'}
          dataSource={dish.rawItems}
          renderItem={rawItem => (
          <List.Item>
            <span>
              {rawItem.name}
            </span>
            <span className={`floatRight`}>
              {`${rawItem?.quantity || 0} ${rawItem?.consumptionUnit.name}`}
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