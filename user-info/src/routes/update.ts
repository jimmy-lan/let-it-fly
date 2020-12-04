/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */
import express, { Request, Response } from "express";
import { BadRequestError } from "@ly-letitfly/common";

const router = express.Router();

router.patch("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    personal: {
      name: { first, last },
      dateOfBirth,
      city,
      region,
      occupation,
    },
    contact: {
      email: { secondary },
      telephone,
      socialMedia: { facebook, linkedIn, tweeter, youtube },
      other: { github, website },
    },
    profile: { description, interests },
  } = req.body;

  // Check for permission

  // Check validity of name if it is defined
  if (first?.length === 0 || first?.length > 35) {
    throw new BadRequestError("First name is too short or too long.");
  }

  if (last?.length === 0 || last?.length > 35) {
    throw new BadRequestError("Last name is too short or too long.");
  }

  return res.send({});
});

export { router as updateInfoRouter };
