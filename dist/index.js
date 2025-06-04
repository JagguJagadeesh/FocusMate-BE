"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const notesRoute_1 = __importDefault(require("./routes/notesRoute"));
const videoRoute_1 = __importDefault(require("./routes/videoRoute"));
const cors_1 = __importDefault(require("cors"));
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.BASE_URL || 'http://localhost:3000',
    credentials: true,
}));
// Routes
app.use('/api', authRoute_1.default);
app.use('/api', notesRoute_1.default);
app.use('/api', videoRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});
// Export as handler for Vercel
exports.handler = (0, serverless_http_1.default)(app);
