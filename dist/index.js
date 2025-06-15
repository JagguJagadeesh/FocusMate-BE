"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const notesRoute_1 = __importDefault(require("./routes/notesRoute"));
const videoRoute_1 = __importDefault(require("./routes/videoRoute"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const allowedOrigins = [
    'http://localhost:3000',
    undefined,
];
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// Routes
app.use('/api', authRoute_1.default);
app.use('/api', notesRoute_1.default);
app.use('/api', videoRoute_1.default);
app.use('/api', taskRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
