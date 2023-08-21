'use client'

import DishModal from "@/app/presentors/dishModal";
import { MealCalendarType } from "@/app/types/calendar";
import { updateModal } from "@/redux/actions/app";
import { useAppDispatch } from "@/redux/hooks";
import { Button, Divider, Table } from "antd";
import { ColumnsType } from "antd/es/table";

const MenuCalendar: React.FC = () => {
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

  const columns: ColumnsType<MealCalendarType> = [
    {
      title: 'Prepare Date',
      dataIndex: 'prepareDate',
      key: 'prepareDate',
      render: (date: Date) => <>{date?.toDateString()}</>,
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      render: (text) => <>{text}</>,
    },
    {
      title: 'MealName',
      dataIndex: 'mealName',
      key: 'mealName',
      render: (text) => <>{text}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={e => openDishModal()}>View</Button>
        </>
      ),
    },
  ]

  const data: MealCalendarType[] = [
    {
      key: '1',
      prepareDate: new Date(),
      day: "Monday",
      mealName: "Rajma Chawal"
    },
    {
      key: '2',
      prepareDate: new Date(),
      day: "Tuesday",
      mealName: "Chole Chawal"
    },
  ];

  return(
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50`}>    
      <Divider>Upcoming 7 Days Meal</Divider>
      <Table 
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  )
}

export default MenuCalendar