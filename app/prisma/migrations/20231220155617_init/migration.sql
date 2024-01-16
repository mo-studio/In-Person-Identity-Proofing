-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('EXPIRED', 'SITE_CONFIRMED', 'INPERSON_PROOFED', 'UNCONFIRMED');

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "case_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3),
    "uuid" TEXT NOT NULL,
    "status" "CaseStatus" NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCase" (
    "id" SERIAL NOT NULL,
    "case_number" INTEGER NOT NULL,
    "user_id" SERIAL NOT NULL,
    "expired_at" TIMESTAMP(3),
    "proofing_agent_id" TEXT NOT NULL,

    CONSTRAINT "UserCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProofingAgent" (
    "user_id" SERIAL NOT NULL,
    "logingov_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "x_509" JSONB,

    CONSTRAINT "ProofingAgent_pkey" PRIMARY KEY ("user_id")
);
