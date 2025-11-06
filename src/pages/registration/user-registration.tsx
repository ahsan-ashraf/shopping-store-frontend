import React from "react";
import { useParams } from "react-router-dom";
import type { Registration } from "../../types";
import RegistrationForm from "./components/registration-form";

const UserRegistration: React.FC = () => {
  const params = useParams<{ role: string }>();
  const role = params.role as Registration;

  return <RegistrationForm role={role} />;
};

export default UserRegistration;
