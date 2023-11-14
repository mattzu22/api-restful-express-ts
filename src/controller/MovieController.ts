 import { Request, Response } from "express";

 import { MovieModel } from "../models/Movie";

 import Logger from "../../config/logger";
 

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body;
        const movieModel = await MovieModel.create(data);
        return res.status(201).json(movieModel);
    } catch (error: any) {
            Logger.error(`Error no sistema ${error.message}`);
    }
}

export async function findMovieById(req: Request, res: Response){
    try {
        const { id } = req.params;
        
        const movie = await MovieModel.findById(id);
        
        if (!movie) {
            return res.status(404).json({error: "Filme não encontrado!"})
        }

        return res.status(200).json(movie)
    } catch (error: any) {
        Logger.error(`Error no sistema ${error.message}`); 
    }
}

export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await MovieModel.find();
        return res.status(200).json(movies)
    } catch (error: any) {
        Logger.error(`Error no sistema ${error.message}`); 
    }
}

export async function deleteMovie(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const movie = await MovieModel.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({error: "Filme não encontrado!"})
        }

        return res.status(200).json({
            msg: `filme deletado com sucesso `
        })
    } catch (error: any) {
        Logger.error(`Error no sistema ${error.message}`); 
    }
}

export async function updateMovie(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const data = req.body;
        const movie = await MovieModel.findById(id);

        if (!movie) {
            return res.status(404).json({error: "Filme não encontrado!"})
        }

        await MovieModel.updateOne({_id: id}, data)

        return res.status(200).json(data)
    } catch (error: any) {
        Logger.error(`Error no sistema ${error.message}`); 
    }
}



