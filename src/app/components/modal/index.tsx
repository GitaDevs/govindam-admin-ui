'use client'
import { useAppSelector } from "@/redux/hooks";
import { isModalOpen, selectModalData } from "@/redux/selectors/app";
import { ModalData } from "@/redux/types/app";
import Modal from "antd/es/modal/Modal";

const CustomModal: React.FC = () => {
  const modalOpen: boolean = useAppSelector(isModalOpen());
  const modalData: ModalData = useAppSelector(selectModalData()) || {};

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