import express from 'express';
import {createProject, addTask , getProjectsById, updateProjectStatus, updateTaskStatus} from '../controllers/project.controller.js';
const projectRouter = express.Router();

projectRouter.post('/', createProject);
projectRouter.post('/:projectId/add-tasks', addTask);
projectRouter.get('/:projectId', getProjectsById);
projectRouter.put('/:projectId/update-status', updateProjectStatus);
projectRouter.put('/:projectId/update-task-status', updateTaskStatus);


export default projectRouter;
