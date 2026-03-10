const welcomePage = async (req, res) => {
    res.status(200).json({
        message: "We are on home page"
    })
}

module.exports = {welcomePage};