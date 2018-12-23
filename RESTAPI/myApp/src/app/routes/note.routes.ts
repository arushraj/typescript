import { Request, Response } from "express";
import { noteController } from "../controllers/note.controller";

export class noteRoutes {
    private noteApp;
    private notecontroller = new noteController();
    constructor(app) {
        this.noteRoutes(app);
    }

    private noteRoutes(app): void {
        // Retrieve all Notes
        app.route('/api/notes').get(this.notecontroller.findAll);

        // Retrieve a single Note with noteId
        app.route('/api/notes/:noteId').get(this.notecontroller.findOne);

        // Create a new Note
        app.post('/api/notes', this.notecontroller.create);

        // Update a Note with noteId
        app.put('/api/notes/:noteId', this.notecontroller.update);

        // Delete a Note with noteId
        app.delete('/api/notes/:noteId', this.notecontroller.delete);
    }

}