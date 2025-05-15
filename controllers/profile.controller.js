import User from '../models/user.model';
import { saveImage } from '../config/multer';

export const getProfile = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user
        });
    }catch(error){
        next(error);
    }

}
