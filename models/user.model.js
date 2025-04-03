import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User's Name is required!"],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        minLength: 2,
        maxLength: 50,
        lowerCase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address!']
    },
    password: {
        type: String,
        required: [true, "User's Name is required!"],
        minLength: 8
    }
},
//adds timestamps for the creation and modification of a user
{timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;