'use client'

import { updateToast } from "@/redux/actions/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectToastData } from "@/redux/selectors/app";
import { ToastInterface } from "@/redux/types/app";
import { notification } from "antd";
import { useEffect } from "react";

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const toastData: ToastInterface = useAppSelector(selectToastData());

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if(toastData && toastData.open && toastData.type) {
      api[toastData.type]({
        key: toastData.message || "key",
        message: toastData.message,
        description: toastData.description || "",
        onClose: () => {
          dispatch(updateToast({ open: false }))
        }
      });
    }
  }, [toastData])

  return contextHolder;
}

export default Toast;