import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const register = async (req, res) => {
    try {
        console.log('Registration request body:', req.body);
        const { username, email, password, confirmPassword } = req.body;

        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
            console.log('Missing fields:', { username, email, password: !!password, confirmPassword: !!confirmPassword });
            return res.status(400).json({ 
                message: "All fields are required",
                received: { username, email, password: !!password, confirmPassword: !!confirmPassword }
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            console.log('Password mismatch:', { passwordLength: password?.length, confirmPasswordLength: confirmPassword?.length });
            return res.status(400).json({ 
                message: "Password and confirm password do not match",
                passwordLength: password?.length,
                confirmPasswordLength: confirmPassword?.length
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        console.log('Attempting to save user:', { username, email });
        await user.save();
        console.log('User saved successfully');

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: "Error registering user",
            error: error.message 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error logging in" });
    }
};


export const  forgotPassword = async (req,res,next) =>{
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        if(user){
            const {newPassword, confirmNewPassword} = req.body;
            if(newPassword !== confirmNewPassword){
                return res.status(400).json({message: "Password and confirm password do not match"});
            }

            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = newHashedPassword;
            await user.save();

            return res.status(200).json({message: "Password reset successful"});
        }

        
        
    }catch(error){
        next(error);
    }

};