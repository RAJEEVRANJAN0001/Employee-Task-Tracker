import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            // Attach user info to request
            req.user = {
                id: decoded.userId,
                email: decoded.email
            };

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Token expired. Please sign in again.'
                });
            }

            return res.status(401).json({
                message: 'Invalid token.'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            message: 'Authentication error.'
        });
    }
};
