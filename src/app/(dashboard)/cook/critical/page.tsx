'use client'

import { Button, Input, SelectProps } from "antd";
import RefAutoComplete from "antd/es/auto-complete";
import { useState } from "react";
import style from "./style.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { updateToast } from "@/redux/actions/app";

const dummyInventoryList = [
  { value: "Rice" },
  { value: "Sugar" },
  { value: "Pulses" },
];

const CriticalInventory: React.FC  = () => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<{ value: string}[]>([]);

  const searchResult = (searchText: string) => {
    if(!searchText) return [];

    const searchResults = dummyInventoryList.filter((item: { value: string }) => {
      return item.value.startsWith(searchText)
    })

    return searchResults
  }

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const raiseAlert = () => {
    // alert raise here and clear input
    dispatch(updateToast({
      open: true,
      message: "Critical alert raised!!",
      type: "success"
    }))
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

      <Button onClick={raiseAlert} className="marginTop30" block danger>
        Raise Alert
      </Button>
    </div>
  );
}

export default CriticalInventory;