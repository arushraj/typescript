import { Note } from "../models/note.model";
import { Request, Response } from "express";

export class noteController {

    /**
     * findAll function()
     * Retrieve and return all notes from the database.
     */
    public findAll(req: Request, res: Response) {
        Note.find()
            .then(notes => {
                res.send(notes);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });
    }
    /**
     * findOne function()
     * Retrieve and return one notes from the database.
     */
    public findOne(req: Request, res: Response) {
        Note.findById(req.params.noteId)
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: 'Note not found with id: ' + req.params.noteId
                    });
                }
                res.send(note);
            }).catch(error => {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving note with id " + req.params.noteId
                });
            });
    }

    /**
     * create function()
     * Create and Save a new Note
     */
    public create(req: Request, res: Response) {
        // Validate request
        if (!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        // Create a Note
        const note = new Note({
            title: req.body.title || "Untitled Note",
            content: req.body.content
        });
        // Save Note in the database
        note.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
    }

    /**
     * update function()
     * Update a note identified by the noteId in the request
     */
    public update(req: Request, res: Response) {
        // Validate Request
        if (!req.body.content) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }

        // Find note and update it with the request body
        Note.findByIdAndUpdate(req.params.noteId, {
            title: req.body.title || "Untitled Note",
            content: req.body.content
        }, { new: true })
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                res.send(note);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.noteId
                });
            });
    }

    /**
     * delete function()
     * Delete a note with the specified noteId in the request
     */
    public delete(req: Request, res: Response) {
        Note.findByIdAndRemove(req.params.noteId)
            .then(note => {
                if (!note) {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                res.send({ message: "Note deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Note not found with id " + req.params.noteId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete note with id " + req.params.noteId
                });
            });
    }
}