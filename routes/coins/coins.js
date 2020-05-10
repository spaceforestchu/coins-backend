var express = require("express");
var router = express.Router();

var coinController = require("./controller/coinController");

/* GET users listing. */
router.get("/get-all-coins", coinController.getAllCoins);

router.post("/get-prices", coinController.getCoinPrices);
module.exports = router;
