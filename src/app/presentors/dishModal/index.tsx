'use client'

import { Button, Collapse, CollapseProps, Descriptions, List } from "antd";

const DishModal: React.FC = () => {

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
      <Descriptions layout="vertical" bordered size="small" className={`marginTop10`}>
        <Descriptions.Item label="1). Samak Rice Kheer" labelStyle={{ fontWeight: 'bold'}}>
          <List
            size={'small'}
            dataSource={['Samak Rice', 'Milk']}
            renderItem={item => (
            <List.Item>
              <span>
                {item}
              </span>
              <span className={`floatRight`}>
                {'2 Cups'}
              </span>
            </List.Item>
            )}
          >
          </List>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="vertical" bordered size="small" className={`marginTop10`}>
        <Descriptions.Item label="2). Kuttu Atta Puri" labelStyle={{ fontWeight: 'bold'}}>
          <List
            size={'small'}
            dataSource={['Kuttu Atta', 'Oil']}
            renderItem={item => (
            <List.Item>
              <span>
                {item}
              </span>
              <span className={`floatRight`}>
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

  return collapsableMenu();
}

export default DishModal;