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
    let undefinedData = [];
    for (let i = 0; i < req.body.length; i++) {
      try {
        let priceData = await cc.priceFull(req.body[i], "USD");
        // console.log("----");
        // console.log(priceData[Object.keys(priceData)]);

        if (Object.keys(priceData).length === 0) {
          undefinedData.push(req.body[i]);
        } else {
          returnData.push(priceData);
        }
      } catch (e) {
        continue;
      }
    }

    return res.status(200).json({
      priceData: returnData,
      undefinedData: undefinedData,
    });
  },
};
