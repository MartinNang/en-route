import express from "express";
import * as itineraryTypeController from "../controllers/itineraryTypeController.js";

import { connect } from "../index.js";

export const itineraryTypeRouter = express.Router();

itineraryTypeRouter.get("/", (req, res, next) => {
  connect((conn) =>
    itineraryTypeController.getAllItineraryTypes(conn, req, res)
  );
});

itineraryTypeRouter.get("/:id", (req, res, next) => {
  connect((conn) =>
    itineraryTypeController.findItineraryTypeById(conn, req, res)
  );
});
