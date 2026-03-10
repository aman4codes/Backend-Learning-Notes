const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register Controller
const registerUser = async (req, res) => {
    try {
        //extract info from frontend
        const { username, email, password, role } = req.body;

        //check if user already exists
        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //storing newUser info
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        })

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "New User created Successfully!!"
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Process Failed",
            reason: e.message
        })
    }
};

//login Controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        //find user with given username
        const findUser = await User.findOne({ username });

        if (!findUser) {
            return res.status(400).json({
                success: false,
                message: `User Doesn't Exists`
            })
        }

        //if password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: `Wrong Password`
            })
        }

        // create user token
        const accessToken = jwt.sign({
            userID: findUser._id,
            username: findUser.username,
            role: findUser.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: `15m`
        })

        res.status(200).json({
            success: true,
            message: "Login Success",
            accessToken
        })


    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Process Failed",
            reason: e.message
        })
    }
};

module.exports = { registerUser, loginUser };