"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sigin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// Generating Token
function generateToken(id) {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_KEY, { expiresIn: "5h" });
}
// SignUp
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(401).json({ message: 'Missing Feilds' });
        const checkUser = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (checkUser)
            return res.status(500).json({ message: 'User already Existed' });
        const hashpass = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashpass
            }
        });
        const token = generateToken(user.id);
        return res.cookie('token', token, {
            httpOnly: true, // Prevents access from JavaScript
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
            .status(200)
            .json({
            message: `User ${user.name} is Created Successfully`, user: { id: user.id, name: user.name, email: user.email }
        });
    }
    catch (e) {
        console.log('Error at Signup', e);
    }
});
exports.signup = signup;
// Sigin
const sigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(401).json({ message: 'Missing Feilds' });
        const checkUser = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!checkUser)
            return res.status(500).json({ message: 'User Not found' });
        const verifypass = yield bcryptjs_1.default.compare(password, checkUser.password);
        if (!verifypass)
            return res.status(500).json({ message: 'password is incorret' });
        const token = generateToken(checkUser.id);
        return res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(200).json({ message: `User ${checkUser.name} is Logined Sucessfully`, user: { id: checkUser.id, name: checkUser.name, email: checkUser.email } });
    }
    catch (e) {
        console.log('Error at Signup', e);
    }
});
exports.sigin = sigin;
