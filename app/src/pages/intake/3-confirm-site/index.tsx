import { initialIntakeData, IntakeContext } from "src/contexts/IntakeContext";
import { generateRandomCaseNumber } from "src/pages/api/cases/NumberGenerator";

import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

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

  const handleCreateCase = async () => {
    try {
      if (intakeData.caseCreated) {
        return;
      }
      // TODO: Ensure that UUID is passed not hard coded
      const response = await fetch("/api/cases/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caseData: {
            case_number: parseInt(intakeData.caseNumber, 10),
            expired_at: null,
            uuid: "1234",
            status: "SITE_CONFIRMED",
          },
        }),
      });

      if (response.ok) {
        const newCase = await response.json();

        setIntakeData({ ...intakeData, caseCreated: true });
      } else {
        console.error("Failed to create case");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIntakeData({ ...intakeData, caseNumber: generateRandomCaseNumber() });
  };
  const router = useRouter();
  useEffect(() => {
    if (intakeData.caseNumber !== "") {
      handleCreateCase();

      // Use the router object from useRouter instead of direct import
      router.push("/intake/4-verify-in-person").catch((error) => {
        console.error("Error navigating:", error);
      });
    }
  }, [intakeData.caseNumber, intakeData.caseCreated]);
  const { name, address } = intakeData.location.attributes;
  const { address1, city, state, zip } = address.physical;

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
