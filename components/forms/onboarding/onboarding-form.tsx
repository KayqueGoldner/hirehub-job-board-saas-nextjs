"use client";

import { useState } from "react";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { UserTypeSelection } from "@/components/forms/onboarding/user-type-form";

type UserSelectionType = "company" | "jobSeeker" | null;

export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  const handleUserTypeSelection = (type: UserSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelection} />;
      case 2:
        return userType === "company" ? (
          <p>User is a company</p>
        ) : (
          <p>User is a job seeker</p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-10 flex items-center gap-4">
        <Image src={Logo} alt="logo" width={50} height={50} />
        <h1 className="text-4xl font-bold">
          Hire
          <span className="text-primary">Hub</span>
        </h1>
      </div>

      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};
