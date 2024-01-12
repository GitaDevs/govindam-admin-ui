'use client'
import UserProfile from "@/app/components/profile";
import React from "react";
import Row from "antd/es/row";
import Col from "antd/es/col";

const ProfilePage:React.FC = () => {

  return (
    <Row className="centerAlign">
      <Col md={24} sm={22} xs={22}>
        <UserProfile />
      </Col>
    </Row>
  )
}

export default ProfilePage;