const adminMiddleware = (req, res, next) => {
    // auth-middleware should have populated this
    const role = req.userInfo?.role;

    // allow admins and super admins
    if (role !== "admin" && role !== "superAdmin") {
        return res.status(403).json({
            success: false,
            message: "Access denied! Admin rights required.",
        });
    }

    next();
};

module.exports = { adminMiddleware };