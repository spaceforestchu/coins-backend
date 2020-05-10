global.fetch = require("node-fetch");
const cc = require("cryptocompare");
cc.setApiKey(process.env.CRYPTO_API_KEY);

module.exports = {
  getAllCoins: async (req, res) => {
    try {
      let coinList = await cc.coinList();

      res.status(200).json({
        coinList,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
  getCoinPrices: async (req, res) => {
    let returnData = [];

    for (let i = 0; i < req.body.length; i++) {
      try {
        let priceData = await cc.priceFull(req.body[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        res.status(500).json({
          error,
        });
      }
    }
    res.status(200).json({
      priceData: returnData,
    });
  },
};
