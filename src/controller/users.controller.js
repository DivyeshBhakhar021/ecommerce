const Users = require("../modal/users.modal");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userpost = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;

        const user = await Users.findOne(
            { $or: [{ email }] }
        );

        console.log("user", user);

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashpassoword = await bcrypt.hash(password, 10);

        console.log("hashpassoword", hashpassoword);

        if (!hashpassoword) {
            return res.status(409).json({
                success: false,
                message: "password is valid while hasing error.",
            });
        }

        const newdata = await Users.create({ ...req.body, password: hashpassoword })

        console.log("newdata", newdata);

        if (!newdata) {
            return res.status(500).json({
                success: false,
                message: "internal server erorr.",
            });
        }

        const newdataf = await Users.findById({ _id: newdata._id }).select("-password");

        console.log("newdataf", newdataf);

        if (!newdataf) {
            return res.status(500).json({
                success: false,
                message: "internal server erorr.",
            });
        }
        res.status(201).json({
            success: true,
            message: "user created successfully.",
            data: newdataf
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}



const generateAuthToken = async (id) => {
    console.log("generateAuthToken", id);
    try {

        const user = await Users.findById(id);

        console.log("sssuser", user);

        const accrestoken = jwt.sign({
            _id: user._id,
            role: user.role
        }, "abc123",
            { expiresIn: 60 * 60 });

        console.log("accrestoken::::::::", accrestoken);

        const refretoken = await jwt.sign({
            _id: id
        },
            "123abc",
            { expiresIn: "2d" });

        console.log("refretokenrefretoken", refretoken);

        user.refretoken = refretoken

        await user.save({ validateBeforeSave: false });

        return { accrestoken, refretoken }
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const user = await Users.findOne({ $or: [{ email }] });

        console.log("userlogin", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        const ValidtUser = await bcrypt.compare(password, user.password);
        console.log("userValidtUser", ValidtUser);

        if (!ValidtUser) {
            return res.status(400).json({
                success: false,
                message: "password not match"
            })
        }

        const { accrestoken, refretoken } = await generateAuthToken(user._id);
        console.log("accrestoken!!!!!!!!!!!1", accrestoken);
        console.log("refretoken!!!!!!!!!!!!", refretoken);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { userpost, login }