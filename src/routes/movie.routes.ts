import { Router } from "express";

import { createMovie, deleteMovie, findMovieById, getAllMovies, updateMovie } from "../controller/MovieController";

import { validate } from "../middleware/handleValidation";
import  { movieCreateValidation }  from "../middleware/movieValidation"; 

const router = Router();

router.post("/movie", movieCreateValidation(), validate, createMovie);

router.get("/movie/:id", findMovieById);

router.get("/movie", getAllMovies);

router.delete("/movie/:id", deleteMovie);

router.patch("/movie/:id", movieCreateValidation(), validate, updateMovie);

export default router;