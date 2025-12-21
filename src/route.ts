import express from "express";
import { S3Route } from "./aws-services/S3/route";
import { SnsRouter } from "./aws-services/SNS/sns.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/aws/s3",
    route: S3Route,
  },
  {
    path: "/aws/sns",
    route: SnsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const ApplicationRootRoute = router;
