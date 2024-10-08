import {
  ATLAN_API_TOKEN,
  ATLAN_INSTANCE_URL,
} from "../utils/get-environment-variables.js";

import fetch from "node-fetch";

export default async function getClassifications({
  sendSegmentEventOfIntegration,
}) {
  var myHeaders = {
    Authorization: `Bearer ${ATLAN_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    `${ATLAN_INSTANCE_URL}/api/meta/types/typedefs?type=classification`,
    requestOptions
  )
    .then((e) => e.json())
    .catch((err) => {
      sendSegmentEventOfIntegration({
        action: "dbt_ci_action_failure",
        properties: {
          reason: "failed_to_get_classifications",
          msg: err,
        },
      });
    });

  return response?.classificationDefs;
}