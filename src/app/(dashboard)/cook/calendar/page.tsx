'use client'

import DishModal from "@/app/presentors/dishModal";
import { MealCalendarType } from "@/app/types/calendar";
import { capitalize, getMealDate, getMealDay } from "@/lib/helpers";
import { updateModal } from "@/redux/actions/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSevenDaysMeals } from "@/redux/selectors/menu";
import { fetchMenuAndMeals } from "@/redux/thunk/menu";
import { Dish, Meal } from "@/redux/types/menu";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Table from "antd/es/table";

const MenuCalendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const sevenDaysMeals = useAppSelector(selectSevenDaysMeals());

  useEffect(() => {
    dispatch(fetchMenuAndMeals("sevenDays"));
  }, []);

  const openDishModal = (dishes: Dish[]) => {
    dispatch(updateModal({ 
      open: true,
      data: {
        title: 'Meal Instructions',
        footer: null,
        content: <DishModal dishes={dishes}/>
      }
    }));
  }

  const columns: ColumnsType<MealCalendarType> = [
    {
      title: 'Prepare Date',
      dataIndex: 'prepareDate',
      key: 'prepareDate',
      render: (date: string) => <>{date}</>,
    },
    {
      title: 'MealName',
      dataIndex: 'mealName',
      key: 'mealName',
      render: (text) => <>{text}</>,
    },
    {
      title: 'MealTime',
      dataIndex: 'mealTime',
      key: 'mealTime',
      render: (text) => <>{capitalize(text)}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { dishes }) => (
        <>
          <Button onClick={e => openDishModal(dishes || [])}>View</Button>
        </>
      ),
    },
  ]

  const renderTable = () => {
    let allMeals: Meal[] = [];

    sevenDaysMeals.forEach(menu => {
      allMeals = [...allMeals, ...(menu?.meals || [])];
    });

    const data: MealCalendarType[] = allMeals.map((meal, index) => {
      return {
        key: "" + index,
        prepareDate: `${getMealDate(meal.servingDate)} (${getMealDay(meal.servingDate, true)})`,
        mealName: meal.name,
        mealTime: meal.servingTime,
        dishes: meal.dishes
      } as MealCalendarType;
    })

    return (
      <Table 
        columns={columns}
        dataSource={data}
        pagination={false}
      />      
    )
  }

  return(
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50`}>    
      <Divider>Upcoming 7 Days Meal</Divider>
      { renderTable() }
    </div>
  )
}

export default MenuCalendar