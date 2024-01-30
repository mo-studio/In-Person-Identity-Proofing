import * as nextRouter from "next/router";

require("@testing-library/jest-dom");
const { toHaveNoViolations } = require("jest-axe");

expect.extend(toHaveNoViolations);

nextRouter.useRouter = jest.fn();

// Mock push method
nextRouter.useRouter.mockImplementation(() => ({
  push: jest.fn(),
}));
