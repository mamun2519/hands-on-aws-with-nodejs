import express from "express";
import { S3Route } from "./aws-services/s3/route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/aws/s3",
    route: S3Route,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const ApplicationRootRoute = router;
