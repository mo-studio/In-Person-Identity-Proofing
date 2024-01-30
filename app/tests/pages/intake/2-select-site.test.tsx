import { fireEvent, render, screen } from "@testing-library/react";
import { initialIntakeData, IntakeContext } from "src/contexts/IntakeContext";
import { generateRandomCaseNumber } from "src/pages/api/cases/NumberGenerator";
import LocationSelectorScreen from "src/pages/intake/2-select-site/index";

describe("LocationSelectorScreen", () => {
  it("Displays Continue button as disabled initially", () => {
    render(<LocationSelectorScreen />);

    const continueButton = screen.getByText("Continue");
    expect(continueButton).toBeDisabled();
    expect(screen.queryByText("Choose a nearby site")).toBeVisible();
  });
  const setIntakeData = (data: typeof initialIntakeData) => {
    return data;
  };

  it("Displays nearby locations", () => {
    render(
      <IntakeContext.Provider
        value={{
          intakeData: {
            ...initialIntakeData,
            isSiteSelected: true,
          },
          setIntakeData,
        }}
      >
        <LocationSelectorScreen />
      </IntakeContext.Provider>
    );
    const searchButton = screen.getByTestId("searchField");
    fireEvent.click(searchButton);
    expect(screen.getByText("Baltimore VA Medical Center")).toBeVisible();
    expect(screen.getByText("Loch Raven VA Medical Center")).toBeVisible();
  });

  it("Enables continue button", () => {
    initialIntakeData.location.id = "1234";

    render(
      <IntakeContext.Provider
        value={{
          intakeData: {
            ...initialIntakeData,
            isSiteSelected: true,
          },
          setIntakeData,
        }}
      >
        <LocationSelectorScreen />
      </IntakeContext.Provider>
    );
    const searchButton = screen.getByTestId("searchField");
    fireEvent.click(searchButton);
    const continueButton = screen.getByText("Continue");
    expect(continueButton).toBeEnabled();
  });

  describe("generateRandomCaseNumber", () => {
    it("should return a string of length 8", () => {
      const caseNumber = generateRandomCaseNumber();
      expect(caseNumber).toHaveLength(8);
    });

    it("should only contain digits", () => {
      const caseNumber = generateRandomCaseNumber();
      const regex = /^[0-9]+$/;
      expect(caseNumber).toMatch(regex);
    });

    it("should return a different case number on each invocation", () => {
      const caseNumber1 = generateRandomCaseNumber();
      const caseNumber2 = generateRandomCaseNumber();
      expect(caseNumber1).not.toEqual(caseNumber2);
    });
  });
});
