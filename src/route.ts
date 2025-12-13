import express from "express";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/sample",
    route: "sampleRouter",
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const ApplicationRootRoute = router;
