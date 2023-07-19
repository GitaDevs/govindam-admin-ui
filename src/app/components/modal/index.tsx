'use client'
import { updateModal } from "@/redux/actions/app";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isModalOpen, selectModalData } from "@/redux/selectors/app";
import { ModalData } from "@/redux/types/app";
import Modal from "antd/es/modal/Modal";

const CustomModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalOpen: boolean = useAppSelector(isModalOpen());
  const modalData: ModalData = useAppSelector(selectModalData()) || {};

  if(!modalData.onOk) {
    modalData.onOk = () => {
      dispatch(updateModal({ open: false }));
    }
  }

  if(!modalData.onCancel) {
    modalData.onCancel = () => {
      dispatch(updateModal({ open: false }));
    }
  }

  return (
    <Modal
      open={modalOpen}
      { ...modalData }
    >
      { modalData.content || null }
    </Modal>
  )
}

export default CustomModal;