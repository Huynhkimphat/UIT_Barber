const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");
router.get("/:slug", (req, res) => {
    res.send(req.params.slug);
});

router.get("/", productController.show);

// router.use('/search', siteController.search);

module.exports = router;