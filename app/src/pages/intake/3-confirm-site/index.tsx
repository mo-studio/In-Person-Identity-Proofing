import { PrismaClient } from "@prisma/client";
import { initialIntakeData, IntakeContext } from "src/contexts/IntakeContext";

import Link from "next/link";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";

import StepIndicator from "src/components/LoginDesignSystem/step-indicator/step-indicator";
import StepIndicatorStep, {
  StepStatus,
} from "src/components/LoginDesignSystem/step-indicator/step-indicator-step";

export default function LocationConfirmationScreen() {
  const contextValue = useContext(IntakeContext);
  const { intakeData, setIntakeData } = contextValue || {
    intakeData: initialIntakeData,
    setIntakeData: (data) => {
      return data;
    },
  };
  const [caseNumber, setCaseNumber] = useState(0);
  const [uuid, setUuid] = useState("");
  const test_uuid = "1234567";
  const handleCreateCase = async () => {
    const caseData = {
      case_number: 123,
      expired_at: null,
      uuid: "your-uuid",
      status: "UNCONFIRMED",
    };

    try {
      const response = await fetch("/api/cases/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
      });

      if (response.ok) {
        const newCase = await response.json();
        console.log("New case created:", newCase);
      } else {
        console.error("Failed to create case");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const handleCreateCase = async () => {
  //   const response =  await fetch("/api/cases/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       case_number: parseInt(intakeData.caseNumber, 10),
  //       uuid: test_uuid,
  //       status: "SITE_CONFIRMED",
  //     }),
  //   });

  //   if (response.ok) {
  //     const newCase =  response.json();
  //     console.log("New case created:", newCase);
  //   } else {
  //     console.error("Failed to create case");
  //   }
  // };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIntakeData({ ...intakeData, caseNumber: generateRandomCaseNumber() });
    handleCreateCase();

    router.push("/intake/4-verify-in-person").catch((error) => {
      console.error("Error navigating:", error);
    });
  };
  const { name, address } = intakeData.location.attributes;
  const { address1, city, state, zip } = address.physical;

  function generateRandomCaseNumber() {
    const digits = "0123456789";
    let caseNumber = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      caseNumber += digits.charAt(randomIndex);
    }

    return caseNumber;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="white-box">
          <StepIndicator>
            <StepIndicatorStep title="Home" status={StepStatus.COMPLETE} />
            <StepIndicatorStep
              title="Select site"
              status={StepStatus.COMPLETE}
            />
            <StepIndicatorStep
              title="Confirm site"
              status={StepStatus.CURRENT}
            />
            <StepIndicatorStep
              title="Verify in-person"
              status={StepStatus.INCOMPLETE}
            />
          </StepIndicator>
          <h1 className="padding-x-0">Confirm your selection</h1>
          <div>
            <p className="margin-y-4">
              You have chosen to verify at the following location:
            </p>
            <p className="margin-y-4">
              {name}
              <br />
              {address1}
              <br />
              {city}, {state} {zip}
            </p>
            <p className="margin-y-4">
              Please confirm that this is a location you will be able to visit
              in the next 10 days before continuing. If you would like to choose
              another location to verify {"in-person,"} please select the{" "}
              {'"Back"'} button.
            </p>
            <div className="margin-y-4">
              <Link href="/intake/4-verify-in-person">
                <button
                  type="button"
                  className="usa-button usa-button--full-width"
                  onClick={handleClick}
                >
                  Continue
                </button>
              </Link>
            </div>
            <div className="margin-top-4">
              <Link href="/intake/2-select-site">
                <button
                  type="button"
                  className="usa-button usa-button--outline usa-button--full-width"
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
