import Project from '../models/project.model.js';

export const createProject = async (req, res, next) => {
    try {
        const {name, description} = req.body;

        const project = await Project.create({name, description});
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            project
        });

    }catch(error){
        next(error);
    }
};


export const addTask = async (req, res, next) => {
    try {
        const {projectId} = req.params;
        const {name, description} = req.body;
        const project = await Project.findById(projectId);
        
        if(!project){
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        const newTask = {
            name,
            description,
            status: 'pending',
            createdAt: new Date()
        };

        project.tasks.push(newTask);
        await project.save();

        res.status(201).json({
            success: true,
            message: 'Task added successfully',
            task: newTask
        });
    } catch (error) {
        next(error);
    }
}

export const getProjectsById = async (req, res, next) => {
    try {
        const {projectId} = req.params;
        const project = await Project.findById(projectId);

        if(!project){
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: 'Project fetched successfully',
            project
        });
        
        
    } catch (error) {
        next(error);
    }
};

export const updateProjectStatus = async (req, res, next) => {
    try{
        const {projectId} = req.params;
        const project = await Project.findById(projectId);

        if(!project){
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        const {status} = req.body;
        project.status = status;
        await project.save();

        res.status(200).json({
            success: true,
            
        })
        
    }catch(error){
        next(error);
    }
};


export const updateTaskStatus = async (req, res, next) => {
    try{    
        const {projectId} = req.params;
        const project = await Project.findById(projectId);

        if(!project){
            const error = new Error('Project not found');
            error.status = 404;
            throw error;
        }

        // Find the first pending task
        const firstPendingTaskIndex = project.tasks.findIndex(task => task.status === 'pending');

        console.log(firstPendingTaskIndex);
        
        if(firstPendingTaskIndex !== -1) {
            project.tasks[firstPendingTaskIndex].status = 'completed';
            await project.save();
        }

        res.status(200).json({
            success: true,
            project
        });
        
    }catch(error){
        next(error);
    }
}


