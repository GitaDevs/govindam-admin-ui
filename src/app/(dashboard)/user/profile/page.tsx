'use client'
import UserProfile from "@/app/components/profile";
import Row from "antd/es/row";
import Col from "antd/es/col";
import React from "react";

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