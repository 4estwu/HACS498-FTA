const axios = require('axios')
var util = require('util')

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};



exports.handler = async (event, context) => {
  const { hash } = event 
  const url = "http://www.hybrid-analysis.com/api/v2/overview/" + hash
    try {
      const res = await axios.get(url, {headers: {
      'api-key': process.env.APIKEY
    }})

        return {
            statusCode: 200,
            body: JSON.stringify(res, getCircularReplacer())

        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 400,
            body: (e)
        }
    }
};