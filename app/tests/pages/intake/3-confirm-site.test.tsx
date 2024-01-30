import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { initialIntakeData, IntakeContext } from "src/contexts/IntakeContext";
import { generateRandomCaseNumber } from "src/pages/api/cases/NumberGenerator";
import LocationConfirmationScreen from "src/pages/intake/3-confirm-site/index";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

global.fetch = jest.fn((input, init) => {
  const mockResponseBody = {};
  const response = new Response(JSON.stringify(mockResponseBody), {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return Promise.resolve(response);
});

describe("LocationConfirmationScreen Component", () => {
  const setIntakeDataMock = jest.fn();
  const renderComponent = () => {
    render(
      <IntakeContext.Provider
        value={{
          intakeData: {
            ...initialIntakeData,
            caseNumber: "",
            caseCreated: false,
          },
          setIntakeData: setIntakeDataMock,
        }}
      >
        <LocationConfirmationScreen />
      </IntakeContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component correctly", () => {
    renderComponent();
    expect(screen.getByText("Confirm your selection")).toBeInTheDocument();
    const continueButton = screen.getByText("Continue");
    expect(continueButton).toBeEnabled();
    expect(screen.queryByText("Confirm your selection")).toBeVisible();
    expect(
      screen.queryByText("You have chosen to verify at the following location:")
    ).toBeVisible();
  });

  test("handles click on Continue button and navigates", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Continue"));
    await waitFor(async () => {
      expect(setIntakeDataMock).toHaveBeenCalledWith(
        expect.objectContaining({
          caseCreated: false,
          caseNumber: expect.any(String),
          isSiteSelected: false,
          location: expect.objectContaining({
            attributes: expect.objectContaining({
              address: expect.objectContaining({
                physical: expect.objectContaining({
                  address1: "",
                  address2: "",
                  city: "",
                  state: "",
                  zip: "",
                }),
              }),
              lat: expect.any(Number),
              long: expect.any(Number),
              name: "",
            }),
            id: "",
          }),
        })
      );
    });
  });

  const setIntakeData = (data: typeof initialIntakeData) => {
    return data;
  };

  test("Displays address selected", () => {
    initialIntakeData.location.attributes.address.physical.address1 =
      "123 shadow lane";
    initialIntakeData.location.attributes.address.physical.city = "Riverdale";
    initialIntakeData.location.attributes.address.physical.state = "TST";
    initialIntakeData.location.attributes.address.physical.zip = "12345";

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
        <LocationConfirmationScreen />
      </IntakeContext.Provider>
    );
    expect(screen.queryByText(/123 shadow lane/)).toBeVisible();
    expect(screen.queryByText(/Riverdale/)).toBeVisible();
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
