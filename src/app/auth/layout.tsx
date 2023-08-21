'use client'
import CustomModal from "../components/modal";
import StoreWrapper from "../containers/storeWrapper";
import Toast from '../components/toast';

export default function AuthLayout ({
  children,
}: { children: React.ReactNode }) {

  return (
    <StoreWrapper>
      <CustomModal />
      <Toast />
      { children }
    </StoreWrapper>
  )
};