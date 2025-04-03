import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

//someone is making a request to get the user details -> authorize middleware -> verify -> if valid -> next -> get user details

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId)

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        //The below two lines attaches the user to the request that's been made and forwards this to the next middleware
        req.user = user;
        next();

    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorize', error: error.message });
    }
}

export default authorize;