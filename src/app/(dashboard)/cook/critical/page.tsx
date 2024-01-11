'use client'
import RefAutoComplete from "antd/es/auto-complete";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createAlertForRawItem, fetchAllRawItems } from "@/redux/thunk/rawItem";
import { selectAllRawItems } from "@/redux/selectors/rawItem";
import { RawItem } from "@/redux/types/rawItem";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import Input from "antd/es/input";

const CriticalInventory: React.FC  = () => {
  const dispatch = useAppDispatch();
  const rawItems = useAppSelector(selectAllRawItems());
  const [desc, setDesc] = useState<string>();
  const [options, setOptions] = useState<(RawItem & { value: string })[]>([]);
  const [selectedRawItemId, setSelectedRawItemId] = useState<string | number>();

  useEffect(() => {
    dispatch(fetchAllRawItems());
  }, [])

  const searchResult = (searchText: string) => {
    if(!searchText) return [];

    const searchResults = rawItems.filter((item) => {
      return item.name.startsWith(searchText)
    })

    return searchResults.map(item => ({ ...item, value: item.name }))
  }

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    const rawItem = rawItems.find(item => item.name === value);

    setSelectedRawItemId(rawItem?.id);
  };

  const raiseAlert = () => {
    if(!selectedRawItemId) return;
    dispatch(createAlertForRawItem({ description: desc, rawItemsId: selectedRawItemId }));
  }

  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  }

  return (
    <div className={`paddinghDesktop50 paddinghMobile10 widthDesktop50 textAlign`}>
      <RefAutoComplete
        className={style.inputWidth}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="Search Inventory" enterButton />
      </RefAutoComplete>

      <TextArea 
        value={desc}
        onChange={handleDescChange}
        className="marginTop20" 
        rows={4}
        placeholder="Enter Description..." 
      />

      <Button onClick={raiseAlert} className="marginTop30" block danger>
        Raise Alert
      </Button>
    </div>
  );
}

export default CriticalInventory;