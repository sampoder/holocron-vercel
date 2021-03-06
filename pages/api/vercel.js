// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { orderBy } from "lodash";

export default async (req, res) => {
  var axios = require("axios");
  var data = "";

  var config = {
    method: "get",
    url: "https://api.vercel.com/v5/now/deployments",
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      res.send(orderBy(response.data.deployments.slice(0, 5).map(({ name, state, meta, created}) => ({
        name,
        state,
        meta,
        created
      }))), "created");
    })
    .catch(function (error) {
      res.send(error);
    });
  
};
