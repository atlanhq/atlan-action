import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 177:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 723:
/***/ ((module) => {

module.exports = eval("require")("@gitbeaker/rest");


/***/ }),

/***/ 31:
/***/ ((module) => {

module.exports = eval("require")("dotenv");


/***/ }),

/***/ 753:
/***/ ((module) => {

module.exports = eval("require")("js-yaml");


/***/ }),

/***/ 1:
/***/ ((module) => {

module.exports = eval("require")("json-stringify-safe");


/***/ }),

/***/ 848:
/***/ ((module) => {

module.exports = eval("require")("node-fetch");


/***/ }),

/***/ 315:
/***/ ((module) => {

module.exports = eval("require")("uuid");


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/core
var core = __nccwpck_require__(450);
// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?dotenv
var _notfounddotenv = __nccwpck_require__(31);
;// CONCATENATED MODULE: ./adapters/utils/get-environment-variables.js


_notfounddotenv.config();

//Common env variables
const get_environment_variables_ATLAN_INSTANCE_URL = new URL(
  process.env.ATLAN_INSTANCE_URL || core.getInput("ATLAN_INSTANCE_URL")
).origin;

const get_environment_variables_ATLAN_API_TOKEN =
  process.env.ATLAN_API_TOKEN || core.getInput("ATLAN_API_TOKEN");

const IS_DEV = process.env.IS_DEV;

const IGNORE_MODEL_ALIAS_MATCHING =
  (process.env.IGNORE_MODEL_ALIAS_MATCHING ||
    core.getInput("IGNORE_MODEL_ALIAS_MATCHING")) == "true";

const ATLAN_CONFIG =
  process.env.ATLAN_CONFIG || core.getInput("ATLAN_CONFIG");

//GITLAB SPECIFIC ENV VARIABLES
async function getCIMergeRequestIID(
  gitlab,
  CI_PROJECT_ID,
  CI_COMMIT_SHA
) {
  if (!process.env.CI_MERGE_REQUEST_IID) {
    const mergeRequestCommit = await gitlab.Commits.allMergeRequests(
      CI_PROJECT_ID,
      CI_COMMIT_SHA
    );

    const firstMergeRequest = mergeRequestCommit[0];
    if (firstMergeRequest) {
      return firstMergeRequest.iid;
    }
  }

  return process.env.CI_MERGE_REQUEST_IID;
}

const {
  CI_PROJECT_PATH,
  CI_PROJECT_ID,
  CI_JOB_URL,
  GITLAB_TOKEN,
  CI_COMMIT_MESSAGE,
  GITLAB_USER_LOGIN,
  CI_PROJECT_NAME,
  CI_COMMIT_SHA,
  CI_PROJECT_NAMESPACE,
} = process.env;

function getGitLabEnvironments() {
  const { DBT_ENVIRONMENT_BRANCH_MAP } = process.env;

  if (DBT_ENVIRONMENT_BRANCH_MAP) {
    const environmentLines = DBT_ENVIRONMENT_BRANCH_MAP.split("\n");
    const environmentMap = {};

    environmentLines.forEach((line) => {
      const [environment, branch] = line.split(":").map((item) => item.trim());
      if (environment && branch) {
        environmentMap[environment] = branch;
      }
    });

    return environmentMap;
  } else {
    return {};
  }
}

//GITHUB SPECIFIC ENV VARIABLES
const GITHUB_TOKEN =
  core.getInput("GITHUB_TOKEN") || process.env.GITHUB_TOKEN;

const getEnvironments = () => {
  return (
    core.getInput("DBT_ENVIRONMENT_BRANCH_MAP")
      ?.trim()
      ?.split("\n")
      ?.map((i) => i.split(":").map((i) => i.trim())) ?? []
  );
};

;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");
;// CONCATENATED MODULE: ./adapters/utils/get-image-url.js


function get_image_url_getImageURL(name, height = 20, width = 20) {
    try {
        return `<img src="${hosted_images[name].url}" alt="${hosted_images[name].alt}" height="${height}" width="${width}"/>`;
    } catch (e) {
        console.log(name);
        return '';
    }
}

function get_image_url_getConnectorImage(connectorName) {
    return get_image_url_getImageURL(`connector-${connectorName.toLowerCase()}`, 15, 15);
}

function get_image_url_getCertificationImage(certificationStatus) {
    return get_image_url_getImageURL(`certification-${certificationStatus.toLowerCase()}`, 15, 15);
}

;// CONCATENATED MODULE: ./adapters/utils/hosted-images.js
/* harmony default export */ const hosted_images = ({
    "atlan-logo": {
        alt: "Atlan Logo",
        url: "https://assets.atlan.com/assets/atlan-a-logo-blue-background.png",
    },
    "atlan-view-asset-button": {
        alt: "View Asset in Atlan Button",
        url: "https://iili.io/H11nfVe.png",
    },
    "atlan-show-lineage-button": {
        alt: "View Lineage in Atlan Button",
        url: "https://iili.io/H11hy1n.png",
    },
    "certification-deprecated": {
        alt: "Certificate Status Deprecated",
        url: "https://assets.atlan.com/assets/status-deprecated.svg",
    },
    "certification-draft": {
        alt: "Certificate Status Drafted",
        url: "https://assets.atlan.com/assets/status-draft.svg",
    },
    "certification-verified": {
        alt: "Certificate Status Verified",
        url: "https://assets.atlan.com/assets/status-verified.svg",
    },
    "connector-airflow": {
        alt: "Connector Airflow",
        url: "https://assets.atlan.com/assets/airflow.svg",
    },
    "connector-athena": {
        alt: "Connector Athena",
        url: "https://assets.atlan.com/assets/athena.svg",
    },
    "connector-aws-s3": {
        alt: "Connector AWS S3",
        url: "https://assets.atlan.com/assets/s3-logo.svg",
    },
    "connector-azure-datalake": {
        alt: "Connector Azure Datalake",
        url: "https://iili.io/H2iiZy7.png",
    },
    "connector-bigquery": {
        alt: "Connector BigQuery",
        url: "https://assets.atlan.com/assets/bigquery.svg",
    },
    "connector-databricks": {
        alt: "Connector Databricks",
        url: "https://assets.atlan.com/assets/databricks.svg",
    },
    "connector-dbt": {
        alt: "Connector dbt",
        url: "https://assets.atlan.com/assets/dbt-new.svg",
    },
    "connector-gcp": {
        alt: "Connector GCP",
        url: "https://assets.atlan.com/assets/gcp-logo.svg",
    },
    "connector-glue": {
        alt: "Connector Glue",
        url: "https://assets.atlan.com/assets/aws-glue.svg",
    },
    "connector-grafana": {
        alt: "Connector Grafana",
        url: "https://assets.atlan.com/assets/grafana.svg",
    },
    "connector-looker": {
        alt: "Connector Looker",
        url: "https://assets.atlan.com/assets/looker.svg",
    },
    "connector-mocks": {
        alt: "Connector Mocks",
        url: "https://iili.io/H2isqwF.png",
    },
    "connector-mysql": {
        alt: "Connector MySQL",
        url: "https://assets.atlan.com/assets/mysql.svg",
    },
    "connector-oracle": {
        alt: "Connector Oracle",
        url: "https://assets.atlan.com/assets/oracle.svg",
    },
    "connector-postgres": {
        alt: "Connector Postgres",
        url: "https://assets.atlan.com/assets/postgresql.svg",
    },
    "connector-powerbi": {
        alt: "Connector PowerBI",
        url: "https://assets.atlan.com/assets/powerbi.svg",
    },
    "connector-presto": {
        alt: "Connector Presto",
        url: "https://iili.io/H2isIFR.png",
    },
    "connector-python": {
        alt: "Connector Python",
        url: "https://iili.io/H2isTap.png",
    },
    "connector-r": {
        alt: "Connector R",
        url: "https://iili.io/H2isu8N.png",
    },
    "connector-redash": {
        alt: "Connector Redash",
        url: "https://assets.atlan.com/assets/redash-logo.svg",
    },
    "connector-redshift": {
        alt: "Connector Redshift",
        url: "https://assets.atlan.com/assets/redshift.svg",
    },
    "connector-sisense": {
        alt: "Connector Sisense",
        url: "https://assets.atlan.com/assets/sisense-logo.svg",
    },
    "connector-snowflake": {
        alt: "Connector Snowflake",
        url: "https://assets.atlan.com/assets/snowflake.svg",
    },
    "connector-tableau": {
        alt: "Connector Tableau",
        url: "https://assets.atlan.com/assets/tableau.svg",
    },
    "connector-mode": {
        alt: "Connector Mode",
        url: "https://iili.io/HVTAlgs.png"
    },
    "connector-sigma": {
        alt: "Connector Sigma",
        url: "https://iili.io/HVTA1dG.png"
    }
});

;// CONCATENATED MODULE: ./adapters/utils/create-comment.js
function truncate(value) {
  if (typeof value === "string")
    return value.length > 100 ? value.substring(0, 100) + "..." : value;
  if (Array.isArray(value))
    return value.length > 10
      ? value.slice(0, 10).join(", ") + "..."
      : value.join(", ");
  return "";
}

// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?node-fetch
var _notfoundnode_fetch = __nccwpck_require__(848);
;// CONCATENATED MODULE: ./adapters/utils/auth.js



async function auth() {
  var myHeaders = {
    authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "content-type": "application/json",
  };

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  var response = await _notfoundnode_fetch(
    `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta`,
    requestOptions
  ).catch((err) => {});

  return response;
}

;// CONCATENATED MODULE: ./adapters/utils/index.js






;// CONCATENATED MODULE: ./adapters/templates/github-integration.js


function getErrorResponseStatus401 (ATLAN_INSTANCE_URL, context) {
    return `We couldn't connect to your Atlan Instance, please make sure to set the valid Atlan Bearer Token as \`ATLAN_API_TOKEN\` as this repository's action secret. 

Atlan Instance URL: ${ATLAN_INSTANCE_URL}
    
Set your repository action secrets [here](https://github.com/${context.payload.repository.full_name}/settings/secrets/actions). For more information on how to setup the Atlan Action, please read the [setup documentation here](https://github.com/atlanhq/atlan-action/blob/main/README.md).`
}

function getErrorResponseStatusUndefined(ATLAN_INSTANCE_URL, context) {
    return `We couldn't connect to your Atlan Instance, please make sure to set the valid Atlan Instance URL as \`ATLAN_INSTANCE_URL\` as this repository's action secret. 

Atlan Instance URL: ${ATLAN_INSTANCE_URL}
    
Make sure your Atlan Instance URL is set in the following format.
\`https://tenant.atlan.com\`
    
Set your repository action secrets [here](https://github.com/${context.payload.repository.full_name}/settings/secrets/actions). For more information on how to setup the Atlan Action, please read the [setup documentation here](https://github.com/atlanhq/atlan-action/blob/main/README.md).`
}

function getSetResourceOnAssetComment(tableMd, setResourceFailed) {
    return `## 🎊 Congrats on the merge!
  
  This pull request has been added as a resource to the following assets:
    
  ${setResourceFailed ? '> ⚠️  Seems like we were unable to set the resources for some of the assets due to insufficient permissions. To ensure that the pull request is linked as a resource, you will need to assign the right persona with requisite permissions to the API token.' : ''}
    
  Name | Resource set successfully
  --- | ---
  ${tableMd}
  `
}

function getAssetInfo(ATLAN_INSTANCE_URL, asset, materialisedAsset, environmentName, projectName) {
    return `### ${get_image_url_getConnectorImage(
        asset.attributes.connectorName
      )} [${asset.displayText}](${ATLAN_INSTANCE_URL}/assets/${
        asset.guid
      }/overview?utm_source=dbt_github_action) ${
        asset.attributes?.certificateStatus
          ? get_image_url_getCertificationImage(asset.attributes.certificateStatus)
          : ""
      }
  Materialised asset: ${get_image_url_getConnectorImage(
        materialisedAsset.attributes.connectorName
      )} [${materialisedAsset.attributes.name}](${ATLAN_INSTANCE_URL}/assets/${
        materialisedAsset.guid
      }/overview?utm_source=dbt_github_action) ${
        materialisedAsset.attributes?.certificateStatus
          ? get_image_url_getCertificationImage(materialisedAsset.attributes.certificateStatus)
          : ""
      }${environmentName ? ` | Environment Name: \`${environmentName}\`` : ""}${
        projectName ? ` | Project Name: \`${projectName}\`` : ""
      }`
}

function getContractAssetInfo(ATLAN_INSTANCE_URL, asset) {
  return `### ${get_image_url_getConnectorImage(
      asset.attributes.connectorName
    )} [${asset.displayText}](${ATLAN_INSTANCE_URL}/assets/${
      asset.guid
    }/overview?utm_source=dbt_github_action) ${
      asset.attributes?.certificateStatus
        ? get_image_url_getCertificationImage(asset.attributes.certificateStatus)
        : ""
    }`
}

function getDownstreamTable(ATLAN_INSTANCE_URL, downstreamAssets, rows, materialisedAsset) {
    return `<details><summary><b>${
        downstreamAssets.entityCount
      } downstream assets 👇</b></summary><br/>
  
  Name | Type | Description | Owners | Terms | Classifications | Source URL
  --- | --- | --- | --- | --- | --- | ---
  ${rows
    .map((row) =>
      row.map((i) => i.replace(/\|/g, "•").replace(/\n/g, "")).join(" | ")
    )
    .join("\n")}
  
  ${
    downstreamAssets.hasMore
      ? `[See more downstream assets at Atlan](${ATLAN_INSTANCE_URL}/assets/${materialisedAsset.guid}/lineage?utm_source=dbt_github_action)`
      : ""
  }
  
  </details>`
}

function getViewAssetButton(ATLAN_INSTANCE_URL, asset) {
    return `${get_image_url_getImageURL(
        "atlan-logo",
        15,
        15
      )} [View asset in Atlan](${ATLAN_INSTANCE_URL}/assets/${
        asset.guid
      }/overview?utm_source=dbt_github_action)`
}

function getMDCommentForModel(ATLAN_INSTANCE_URL, model) {
    return `${get_image_url_getConnectorImage(model?.attributes?.connectorName)} [${
        model?.displayText
      }](${ATLAN_INSTANCE_URL}/assets/${model?.guid}/overview?utm_source=dbt_github_action)`
}

function getMDCommentForMaterialisedView(ATLAN_INSTANCE_URL, materialisedView) {
    return `${get_image_url_getConnectorImage(materialisedView?.attributes?.connectorName)} [${
        materialisedView?.attributes?.name
      }](${ATLAN_INSTANCE_URL}/assets/${materialisedView?.guid}/overview?utm_source=dbt_github_action)`
}

function getTableMD(md, resp) {
    return `${md} | ${resp ? '✅' : '❌'} \n`
}
;// CONCATENATED MODULE: ./adapters/integrations/contract/contract.js
// Common interface that each new integration has to implement
class IntegrationInterface {
  constructor(token) {
    this.token = token;
  }

  async run() {
    throw new Error("Not Implemented");
  }

  async printDownstreamAssets(config) {
    throw new Error("Not Implemented");
  }

  async setResourceOnAsset(config) {
    throw new Error("Not Implemented");
  }

  async authIntegration(config) {
    throw new Error("Not Implemented");
  }

  async sendSegmentEventOfIntegration({ action, properties }) {
    throw new Error("Not Implemented");
  }

  async getChangedFiles(config) {
    throw new Error("Not Implemented");
  }

  async getAssetName(config) {
    throw new Error("Not Implemented");
  }

  async getFileContents(config) {
    throw new Error("Not Implemented");
  }

  async checkCommentExists(config) {
    throw new Error("Not Implemented");
  }

  async createIssueComment(config) {
    throw new Error("Not Implemented");
  }

  async deleteComment(config) {
    throw new Error("Not Implemented");
  }

  async renderDownstreamAssetsComment() {
    throw new Error("Not Implemented");
  }
}

;// CONCATENATED MODULE: ./adapters/api/get-asset-classifications.js




async function getAssetClassifications() {
    var myHeaders = {
      Authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
      "Content-Type": "application/json",
    };
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    var response = await _notfoundnode_fetch(
      `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta/types/typedefs?type=classification`,
      requestOptions
    )
      .then((e) => e.json())
      .catch((err) => {
        return {
          error: err
        }
      });
    if (response.error) return response
  
    return response?.classificationDefs;
  }
;// CONCATENATED MODULE: ./adapters/templates/atlan.js


function getErrorModelNotFound(name) {
  return `
 <br>❌ Model with name **${name}** could not be found or is deleted <br><br>
  `;
}

function getErrorAssetNotFound(name) {
  return `### Asset: **${name}**
  :warning: It seems that the underlying asset you were working with could not be found on Atlan. This could mean the asset is not synced or is currently unavailable.
  To address this:
  • Check asset sync: Ensure that the relevant assets are catalogued in Atlan.
  • Review asset source: Double-check the source database or data pipeline to ensure all upstream data is flowing correctly.
  `;
}

function getErrorDoesNotMaterialize(
  name,
  ATLAN_INSTANCE_URL,
  response,
  integration
) {

  return `
<br>❌ Model with name [${name}](${ATLAN_INSTANCE_URL}/assets/${response.entities[0].guid}/overview?utm_source=dbt_${integration}_action) does not materialise any asset <br><br>`;
}

function getNewModelAddedComment(fileName) {
  return `### ${get_image_url_getConnectorImage("dbt")} <b>${fileName}</b> 🆕
  Its a new model and not present in Atlan yet, you'll see the downstream impact for it after its present in Atlan.`
}

function getBaseComment(totalChangedFiles, comments) {
  return `### ${get_image_url_getImageURL("atlan-logo", 15, 15)} Atlan impact analysis
  Here is your downstream impact analysis for **${totalChangedFiles} ${
        totalChangedFiles > 1 ? "models" : "model"
      }** you have edited.
  
  ${comments}`
}

function getContractImpactAnalysisBaseComment(
  totalChangedFiles, 
  comments,
  warningComments
) {
  return `### ${get_image_url_getImageURL("atlan-logo", 15, 15)} Atlan impact analysis
  We've detected changes in **${totalChangedFiles} ${
        totalChangedFiles > 1 ? "contracts" : "contract"
      }** that you've edited. Below is the downstream impact analysis of these changes.
  
  ${comments}
  
  ${warningComments}
  `
}
// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?json-stringify-safe
var _notfoundjson_stringify_safe = __nccwpck_require__(1);
;// CONCATENATED MODULE: ./adapters/api/get-contract-asset.js






async function getContractAsset({
  dataset,
  assetQualifiedName,
}) {
  var myHeaders = {
    Authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  var raw = _notfoundjson_stringify_safe(
    {
      dsl: {
          from: 0,
          size: 1,
          query: {
              bool: {
                  must: [
                      {
                          match: {
                              __state: "ACTIVE"
                          }
                      },
                      {
                          term: {
                              qualifiedName: assetQualifiedName
                          }
                      },
                      {
                        terms: {
                          "__typeName.keyword": [
                            "Table",
                            "MaterialisedView",
                            "View"
                          ]
                        }
                      }
                  ]
              }
          }
      },
      attributes: [
          "guid",
          "name",
          "description",
          "userDescription",
          "sourceURL",
          "qualifiedName",
          "connectorName",
          "certificateStatus",
          "certificateUpdatedBy",
          "certificateUpdatedAt",
          "ownerUsers",
          "ownerGroups",
          "classificationNames",
          "meanings"
      ],
      suppressLogs: true,
      showSearchScore: false,
      excludeClassifications: true,
      includeClassificationNames: true,
      excludeMeanings: false
    }
  );

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  var response = await _notfoundnode_fetch(
    `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta/search/indexsearch`,
    requestOptions
  )
    .then((e) => e.json())
    .catch((err) => {
      return {
        error: err,
        comment: getErrorAssetNotFound(dataset)
      }
    });

  if (!response?.entities?.length) {
    return {
      error: "asset not found",
      comment: getErrorAssetNotFound(dataset),
    };
  }
  
  return response.entities[0];
}

;// CONCATENATED MODULE: ./adapters/api/get-downstream-assets.js






const ASSETS_LIMIT = 100;

async function getDownstreamAssets(
  asset,
  guid,
  totalModifiedFiles,
  sendSegmentEventOfIntegration,
  integration
) {
  var myHeaders = {
    authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "content-type": "application/json",
  };

  var raw = _notfoundjson_stringify_safe({
    "guid": guid,
    "size": Math.max(Math.ceil(ASSETS_LIMIT / totalModifiedFiles), 1),
    "from": 0,
    "depth": 21,
    "direction": "OUTPUT",
    "entityFilters": {
        "condition": "AND",
        "criterion": [
          {
            "attributeName": "__state",
            "operator": "eq",
            "attributeValue": "ACTIVE"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DbtProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DbtColumnProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DataEntityMappingProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DataAttributeMappingProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "Process"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "ColumnProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "BIProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "FivetranProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "FivetranColumnProcess"
          }
        ]
    },
    "entityTraversalFilters": {
        "condition": "AND",
        "criterion": [
          {
            "attributeName": "__state",
            "operator": "eq",
            "attributeValue": "ACTIVE"
          }
        ]
    },
    "relationshipTraversalFilters": {
        "condition": "AND",
        "criterion": [
          {
            "attributeName": "__state",
            "operator": "eq",
            "attributeValue": "ACTIVE"
          }
        ]
    },
    "attributes": [
        "name",
        "description",
        "userDescription",
        "sourceURL",
        "qualifiedName",
        "connectorName",
        "certificateStatus",
        "certificateUpdatedBy",
        "certificateUpdatedAt",
        "ownerUsers",
        "ownerGroups",
        "classificationNames",
        "meanings"
    ],
    "excludeMeanings": false,
    "excludeClassifications": false
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  var handleError = (err) => {
  const comment = `
  ### ${get_image_url_getConnectorImage(asset.attributes.connectorName
  )} [${asset.displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${
    asset.guid
  }/overview?utm_source=dbt_${integration}_action) ${
    asset.attributes?.certificateStatus
      ? get_image_url_getCertificationImage(asset.attributes.certificateStatus)
      : ""
  }
          
  _Failed to fetch impacted assets._
              
  ${get_image_url_getImageURL(
    "atlan-logo",
    15,
    15
  )} [View lineage in Atlan](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${
        asset.guid
    }/lineage/overview?utm_source=dbt_${integration}_action)
  `;

    sendSegmentEventOfIntegration({
      action: "dbt_ci_action_failure",
      properties: {
        reason: "failed_to_fetch_lineage",
        asset_guid: asset.guid,
        asset_name: asset.name,
        asset_typeName: asset.typeName,
        msg: err,
      },
    });

    return comment;
  };

  var response = await _notfoundnode_fetch(
    `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta/lineage/list`,
    requestOptions
  )
    .then((e) => {
      if (e.status === 200) {
        return e.json();
      } else {
        throw e;
      }
    })
    .catch((err) => {
      return {
        error: handleError(err),
      };
    });
  if (response.error) return response;
  
  const modifiedEntities = response.entities.filter(item => item.guid !== guid)

  return {...response, entities: modifiedEntities}
}

function contructCommentForDownstreamLineageFetchError({
  asset,
  utmSource
}){
  const comment = `
  ### ${getConnectorImage(asset.attributes.connectorName
  )} [${asset.displayText}](${ATLAN_INSTANCE_URL}/assets/${
    asset.guid
  }/overview?utm_source=${utmSource}) ${
    asset.attributes?.certificateStatus
      ? getCertificationImage(asset.attributes.certificateStatus)
      : ""
  }
          
  _Failed to fetch impacted assets._
              
  ${getImageURL(
    "atlan-logo",
    15,
    15
  )} [View lineage in Atlan](${ATLAN_INSTANCE_URL}/assets/${
        asset.guid
    }/lineage/overview?utm_source=${utmSource})
  `;

  return comment;
}

async function getDownstreamLineageForAssets({
  asset,
  guid,
  totalModifiedFiles,
  utmSource
}) {
  var myHeaders = {
    authorization: `Bearer ${ATLAN_API_TOKEN}`,
    "content-type": "application/json",
  };

  var raw = stringify({
    "guid": guid,
    "size": Math.max(Math.ceil(ASSETS_LIMIT / totalModifiedFiles), 1),
    "from": 0,
    "depth": 21,
    "direction": "OUTPUT",
    "entityFilters": {
        "condition": "AND",
        "criterion": [
          {
            "attributeName": "__state",
            "operator": "eq",
            "attributeValue": "ACTIVE"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DbtProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DbtColumnProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DataEntityMappingProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "DataAttributeMappingProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "Process"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "ColumnProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "BIProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "FivetranProcess"
          },
          {
            "attributeName": "__typeName",
            "operator": "neq",
            "attributeValue": "FivetranColumnProcess"
          }
        ]
    },
    "entityTraversalFilters": {
        "condition": "AND",
        "criterion": [
          {
            "attributeName": "__state",
            "operator": "eq",
            "attributeValue": "ACTIVE"
          }
        ]
    },
    "relationshipTraversalFilters": {
        "condition": "AND",
        "criterion": [
          {
            "attributeName": "__state",
            "operator": "eq",
            "attributeValue": "ACTIVE"
          }
        ]
    },
    "attributes": [
        "name",
        "description",
        "userDescription",
        "sourceURL",
        "qualifiedName",
        "connectorName",
        "certificateStatus",
        "certificateUpdatedBy",
        "certificateUpdatedAt",
        "ownerUsers",
        "ownerGroups",
        "classificationNames",
        "meanings"
    ],
    "excludeMeanings": false,
    "excludeClassifications": false
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  var response = await fetch(
    `${ATLAN_INSTANCE_URL}/api/meta/lineage/list`,
    requestOptions
  )
    .then((e) => {
      if (e.status === 200) {
        return e.json();
      } else {
        throw e;
      }
    })
    .catch((err) => {
      return {
        error: err,
        comment: contructCommentForDownstreamLineageFetchError({asset, utmSource}),
      };
    });
  if (response.error) return {
    error: err,
    comment: contructCommentForDownstreamLineageFetchError({asset, utmSource}),
  };

  const modifiedEntities = response.entities.filter(item => item.guid !== guid)

  return {...response, entities: modifiedEntities}
}

// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@actions/github
var github = __nccwpck_require__(177);
;// CONCATENATED MODULE: ./adapters/logger/logger.js
// logger.js

function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString();
}

function logInfo(message, method) {
  const timestamp = getCurrentTimestamp();
  const logEntry = {
    level: "ERROR",
    timestamp,
    method,
    message,
  };
  console.error(logEntry);
}

function withInfo(message, vcs, sha, method) {
  const timestamp = getCurrentTimestamp();
  const logEntry = {
    level: "INFO",
    timestamp,
    vcs,
    sha,
    method,
    message,
  };
  console.log(logEntry);
}

function withError(message, vcs, sha, method) {
  const timestamp = getCurrentTimestamp();
  const logEntry = {
    level: "ERROR",
    timestamp,
    vcs,
    sha,
    method,
    message,
  };
  console.error(logEntry);
}

function debug(message, vcs, sha, method) {
  const timestamp = getCurrentTimestamp();
  const logEntry = {
    level: "DEBUG",
    timestamp,
    vcs,
    sha,
    method,
    message,
  };
  console.debug(logEntry);
}

const logger = {
  withInfo,
  withError,
  debug,
  logInfo,
};

/* harmony default export */ const logger_logger = (logger);

;// CONCATENATED MODULE: ./adapters/api/get-asset.js





async function getAsset({
  name,
  sendSegmentEventOfIntegration,
  environment,
  integration,
}) {
  var myHeaders = {
    Authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  var raw = _notfoundjson_stringify_safe({
    dsl: {
      from: 0,
      size: 21,
      query: {
        bool: {
          must: [
            {
              match: {
                __state: "ACTIVE",
              },
            },
            {
              match: {
                "__typeName.keyword": "DbtModel",
              },
            },
            {
              match: {
                "name.keyword": name,
              },
            },
            ...(environment
              ? [
                  {
                    term: {
                      "assetDbtEnvironmentName.keyword": environment,
                    },
                  },
                ]
              : []),
          ],
        },
      },
    },
    attributes: [
      "name",
      "description",
      "userDescription",
      "sourceURL",
      "qualifiedName",
      "connectorName",
      "certificateStatus",
      "certificateUpdatedBy",
      "certificateUpdatedAt",
      "ownerUsers",
      "ownerGroups",
      "classificationNames",
      "meanings",
      "dbtModelSqlAssets",
    ],
    relationAttributes: [
      "name",
      "description",
      "assetDbtProjectName",
      "assetDbtEnvironmentName",
      "connectorName",
      "certificateStatus",
    ],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  var response = await _notfoundnode_fetch(
    `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta/search/indexsearch#findAssetByExactName`,
    requestOptions
  )
    .then((e) => e.json())
    .catch((err) => {
      sendSegmentEventOfIntegration({
        action: "dbt_ci_action_failure",
        properties: {
          reason: "failed_to_get_asset",
          asset_name: name,
          msg: err,
        },
      });
    });

  if (!response?.entities?.length) {
    return {
      error: getErrorModelNotFound(name),
    };
  }

  if (Array.isArray(response.entities)) {
    response.entities.sort((entityA, entityB) => {
      const hasDbtModelSqlAssetsA =
        entityA.attributes.dbtModelSqlAssets &&
        entityA.attributes.dbtModelSqlAssets.length > 0;
      const hasDbtModelSqlAssetsB =
        entityB.attributes.dbtModelSqlAssets &&
        entityB.attributes.dbtModelSqlAssets.length > 0;

      if (hasDbtModelSqlAssetsA && !hasDbtModelSqlAssetsB) {
        return -1; // entityA comes before entityB
      } else if (!hasDbtModelSqlAssetsA && hasDbtModelSqlAssetsB) {
        return 1; // entityB comes before entityA
      }

      // Primary sorting criterion: Latest createTime comes first
      if (entityA.createTime > entityB.createTime) {
        return -1;
      } else if (entityA.createTime < entityB.createTime) {
        return 1;
      }

      return 0; // No difference in sorting for these two entities
    });
  }

  if (!response?.entities[0]?.attributes?.dbtModelSqlAssets?.length > 0)
    return {
      error: getErrorDoesNotMaterialize(
        name,
        get_environment_variables_ATLAN_INSTANCE_URL,
        response,
        integration
      ),
    };

  return response.entities[0];
}

;// CONCATENATED MODULE: ./adapters/api/get-classifications.js




async function getClassifications({
  sendSegmentEventOfIntegration,
}) {
  var myHeaders = {
    Authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await _notfoundnode_fetch(
    `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta/types/typedefs?type=classification`,
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
// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?uuid
var _notfounduuid = __nccwpck_require__(315);
;// CONCATENATED MODULE: ./adapters/api/create-resource.js





async function createResource(
  guid,
  name,
  link,
  sendSegmentEventOfIntegration
) {
  var myHeaders = {
    Authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  var raw = _notfoundjson_stringify_safe({
    entities: [
      {
        typeName: "Link",
        attributes: {
          qualifiedName: (0,_notfounduuid.v4)(),
          name,
          link,
          tenantId: "default",
        },
        relationshipAttributes: {
          asset: {
            guid,
          },
        },
      },
    ],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  var response = await _notfoundnode_fetch(
    `${get_environment_variables_ATLAN_INSTANCE_URL}/api/meta/entity/bulk`,
    requestOptions
  )
    .then((e) => e.json())
    .catch((err) => {
      console.log(err);
      sendSegmentEventOfIntegration({
        action: "dbt_ci_action_failure",
        properties: {
          reason: "failed_to_create_resource",
          asset_name: name, // This should change
          msg: err,
        },
      });
    });

  if (response?.errorCode) return null;
  return response;
}

;// CONCATENATED MODULE: ./adapters/api/segment.js



async function sendSegmentEvent(action, body) {
  const myHeaders = {
    authorization: `Bearer ${get_environment_variables_ATLAN_API_TOKEN}`,
    "content-type": "application/json",
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
  };

  var response = null;

  if (!IS_DEV) {
    response = await _notfoundnode_fetch(
      `${get_environment_variables_ATLAN_INSTANCE_URL}/api/service/segment/track`,
      requestOptions
    )
      .then((resp) => {
        console.log("send segment event", action, body);
      })
      .catch((err) => {
        console.log("couldn't send segment event", err);
      });
  } else {
    console.log("send segment event", action, body);
  }

  return response;
}

;// CONCATENATED MODULE: ./adapters/api/index.js







// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?js-yaml
var _notfoundjs_yaml = __nccwpck_require__(753);
;// CONCATENATED MODULE: ./adapters/integrations/atlan-contract-impact-analysis-github.js

















var headSHA;
const integrationName = "GITHUB_CONTRACT_IMPACT_ANALYSIS";
const actionName = "contract_ci_action"
const utmSource = "dbt_github_action"

class ContractIntegration extends IntegrationInterface {
  constructor(token) {
    super(token);
  }

  async run() {
    try {
      const timeStart = Date.now();
      const { context } = github;

      const octokit = github.getOctokit(this.token);
      const { pull_request } = context?.payload;
      const { state, merged } = pull_request;
      headSHA = pull_request?.head?.sha;

      logger_logger.withInfo(
        "GITHUB_CONTRACT_IMPACT_ANALYSIS is running...",
        integrationName,
        headSHA,
        "run"
      );

      
      if (!(await this.authIntegration({ octokit, context }))) {
        logger_logger.withError(
          "Authentication failed. Wrong API Token.",
          integrationName,
          headSHA,
          "run"
        );
        throw { message: "Wrong API Token" };
      }

      let total_assets = 0;
      
      if (state === "open") {
        total_assets = await this.printDownstreamAssets({ octokit, context });
      }

      if (total_assets !== 0) {
        await this.sendSegmentEventOfIntegration({
          action: `${actionName}_run`,
          properties: {
            asset_count: total_assets,
            total_time: Date.now() - timeStart,
          },
        });
      }

      logger_logger.withInfo(
        "Successfully Completed GITHUB_CONTRACT_IMPACT_ANALYSIS",
        integrationName,
        headSHA,
        "run"
      );
    } catch (error) {
      logger_logger.withError(
        `Error in run(): ${error.message}`,
        integrationName,
        headSHA,
        "run"
      );
      throw error;
    }
  }

  async printDownstreamAssets({ octokit, context }) {
    logger_logger.withInfo(
      "Printing downstream assets...",
      integrationName,
      headSHA,
      "printDownstreamAssets"
    );

    try {
        const changedFiles = await this.getChangedFiles({ octokit, context });
        let comments = ``;
        let warningComments = ``;
        let totalChangedFiles = 0;

        const atlanConfig = ATLAN_CONFIG;

        // Read atlan config file
        const config = this.readYamlFile(atlanConfig);
        if (config.error) {
          logger_logger.withError(
            `Failed to read atlan config file ${atlanConfig}: ${config.error}`,
            integrationName,
            headSHA,
            "printDownstreamAssets"
          );
          return;
        }

        let datasources = this.parseDatasourceFromConfig(config.contentYaml)

        // If no datasources found, do not proceed
        if (datasources.size <= 0) {
          logger_logger.withError(
            `No datasources found in atlan config ${atlanConfig}`,
            integrationName,
            headSHA,
            "printDownstreamAssets"
          );
          return;
        }

        for (const { fileName, filePath, status } of changedFiles) {
            // Skipping non yaml files
            if (!filePath.endsWith('.yaml') && !filePath.endsWith('.yml')) {
              logger_logger.withInfo(
                `Skipping file: ${filePath}`,
                integrationName,
                headSHA,
                "printDownstreamAssets"
              );
              continue
            }

            logger_logger.withInfo(
              `Processing file: ${filePath}`,
              integrationName,
              headSHA,
              "printDownstreamAssets"
            );

            const contract = this.readYamlFile(filePath);
            if (contract.error) {
              logger_logger.withError(
                `Failed to read yaml file ${filePath}: ${contract.error}`,
                integrationName,
                headSHA,
                "printDownstreamAssets"
              );
              continue
            }
            
            let dataset = contract.contentYaml.dataset
            // Skip non contract yaml file
            if (!dataset) {
              continue
            }

            const assetQualifiedName = this.getQualifiedName(
              datasources, 
              contract.contentYaml
            );

            if (assetQualifiedName === undefined) {
              logger_logger.withError(
                `Failed to construct asset qualified name for contract ${filePath}`,
                integrationName,
                headSHA,
                "printDownstreamAssets"
              );
              continue;
            }

            logger_logger.withInfo(
              `Generated asset qualified name ${assetQualifiedName} for contract ${filePath}`,
              integrationName,
              headSHA,
              "printDownstreamAssets"
            );

            // Fetch asset from Atlan
            const asset = await getContractAsset({
              dataset,
              assetQualifiedName: assetQualifiedName
            });

            if (asset.error) {
              logger_logger.withError(
                `Assets fetch error for ${dataset}: ${asset.error}`,
                integrationName,
                headSHA,
                "printDownstreamAssets"
              );

              this.sendSegmentEventOfIntegration({
                action: `${actionName}_failure`,
                properties: {
                  reason: "failed_to_get_asset",
                  asset_name: dataset,
                  msg: asset.error,
                },
              });

              totalChangedFiles++
              warningComments += asset.comment;
              warningComments += "\n\n---\n\n"
              continue;
            }

            logger_logger.withInfo(
              `Processing asset: ${dataset}`,
              integrationName,
              headSHA,
              "printDownstreamAssets"
            );
            
            const timeStart = Date.now();
            const totalModifiedFiles = changedFiles.filter(
              (i) => i.status === "modified"
            ).length;
            
            // Fetch downstream assets
            const downstreamAssets = await getDownstreamAssets(
                asset,
                asset.guid,
                totalModifiedFiles,
                utmSource
            );
    
            if (downstreamAssets.error) {
                logger_logger.withError(
                  `Downstream assets error for ${dataset}: ${downstreamAssets.error}`,
                  integrationName,
                  headSHA,
                  "printDownstreamAssets"
                );

                this.sendSegmentEventOfIntegration({
                  action: `${actionName}_failure`,
                  properties: {
                    reason: "failed_to_fetch_lineage",
                    asset_guid: asset.guid,
                    asset_name: asset.name,
                    asset_typeName: asset.typeName,
                    msg: downstreamAssets.error,
                  },
                });

                totalChangedFiles++
                warningComments += downstreamAssets.comment;
                warningComments += "\n\n---\n\n"
                continue;
            }

            // Send segment event for successful downstream asset fetch
            this.sendSegmentEventOfIntegration({
                action: `${actionName}_downstream_unfurl`,
                properties: {
                  asset_guid: asset.guid,
                  asset_type: asset.typeName,
                  downstream_count: downstreamAssets.entities.length,
                  total_fetch_time: Date.now() - timeStart,
                },
            });
    
            // Fetch classification for asset
            const classifications = await getAssetClassifications()

            if (classifications.error) {
              logger_logger.withError(
                `Failed to fetch cllassification for ${assetObj["name"]}: ${classifications.error}`,
                integrationName,
                headSHA,
                "printDownstreamAssets"
              );
              
              this.sendSegmentEventOfIntegration({
                action: `${actionName}_failure`,
                properties: {
                  reason: "failed_to_get_classifications",
                  msg: classifications.error,
                },
              });
            }
    
            // Construct comment for displaying downstream assets
            const comment = await this.renderDownstreamAssetsComment({
                asset,
                downstreamAssets,
                classifications,
            });
            
            comments += comment;

            if (comment.trim() !== "") {
              comments += "\n\n---\n\n";
            }
    
            totalChangedFiles++;
        }
        
        // Add header comment before asset info comments
        comments = getContractImpactAnalysisBaseComment(
          totalChangedFiles, 
          comments, 
          warningComments
        );

        const existingComment = await this.checkCommentExists({
          octokit,
          context,
        });
  
        logger_logger.withInfo(
          `Existing Comment: ${existingComment?.id}`,
          integrationName,
          headSHA,
          "printDownstreamAssets"
        );

        if (totalChangedFiles > 0)
        await this.createIssueComment({
            octokit,
            context,
            content: comments,
            comment_id: existingComment?.id,
        });

        if (totalChangedFiles === 0 && existingComment)
        await this.deleteComment({
            octokit,
            context,
            comment_id: existingComment?.id,
        });

        logger_logger.withInfo(
          "Successfully printed Downstream Assets",
          integrationName,
          headSHA,
          "printDownstreamAssets"
        );

        return totalChangedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error in printDownstreamAssets: ${error.message}`,
        integrationName,
        headSHA,
        "printDownstreamAssets"
      );
      throw error;
    }
  }

  async authIntegration({ octokit, context }) {
    logger_logger.withInfo(
      "Authenticating with Atlan",
      integrationName,
      headSHA,
      "authIntegration"
    );

    try {
      const response = await auth();

      const existingComment = await this.checkCommentExists({
        octokit,
        context,
      });

      logger_logger.withInfo(
        `Existing Comment: ${existingComment?.id}`,
        integrationName,
        headSHA,
        "authIntegration"
      );

      if (response?.status === 401) {
        logger_logger.withError(
          "Authentication failed: Status 401",
          integrationName,
          headSHA,
          "authIntegration"
        );
        await this.createIssueComment({
          octokit,
          context,
          content: getErrorResponseStatus401(get_environment_variables_ATLAN_INSTANCE_URL, context),
          comment_id: existingComment?.id,
        });
        return false;
      }

      if (response === undefined) {
        logger_logger.withError(
          "Authentication failed: Undefined response",
          integrationName,
          headSHA,
          "authIntegration"
        );
        await this.createIssueComment({
          octokit,
          context,
          content: getErrorResponseStatusUndefined(get_environment_variables_ATLAN_INSTANCE_URL, context),
          comment_id: existingComment?.id,
        });
        return false;
      }
      logger_logger.withInfo(
        "Successfully Authenticated with Atlan",
        integrationName,
        headSHA,
        "authIntegration"
      );
      return true;
    } catch (error) {
      logger_logger.withError(
        `Error in authIntegration: ${error.message}`,
        integrationName,
        headSHA,
        "authIntegration"
      );
      throw error;
    }
  }

  async sendSegmentEventOfIntegration({ action, properties }) {
    try {
      const domain = new URL(get_environment_variables_ATLAN_INSTANCE_URL).hostname;
      const { context } = github; //confirm this
      logger_logger.withInfo(
        `Sending Segment event for action: ${action}`,
        integrationName,
        headSHA,
        "sendSegmentEventOfIntegration"
      );

      const raw = _notfoundjson_stringify_safe({
        category: "integration",
        object: "github",
        action,
        userId: "atlan-annonymous-github",
        properties: {
          ...properties,
          github_action_id: `https://github.com/${context?.payload?.repository?.full_name}/actions/runs/${context?.runId}`,
          domain,
        },
      });

      return sendSegmentEvent(action, raw);
    } catch (error) {
      logger_logger.withError(
        `Error sending Segment event for action: ${action} - ${error.message}`,
        integrationName,
        headSHA,
        "sendSegmentEventOfIntegration"
      );
      throw error;
    }
  }

  async getChangedFiles({ octokit, context }) {
    try {
      logger_logger.withInfo(
        "Fetching changed files...",
        integrationName,
        headSHA,
        "getChangedFiles"
      );

      const { repository, pull_request } = context.payload,
        owner = repository.owner.login,
        repo = repository.name,
        pull_number = pull_request.number;

      const res = await octokit.request(
        `GET /repos/${owner}/${repo}/pulls/${pull_number}/files`,
        {
          owner,
          repo,
          pull_number,
        }
      );

      var changedFiles = res.data
        .map(({ filename, status }) => {
          try {
            const isYamlFile = filename.match(/\.(yaml|yml)$/);

            if (isYamlFile) {
              const contractName = filename.split('/').pop().replace(/\.(yaml|yml)$/, '');
              return {
                fileName: contractName,
                filePath: filename,
                status,
              };
            }
          } catch (e) {
            logger_logger.withError(
              `Error processing file: ${filename} - ${e.message}`,
              integrationName,
              headSHA,
              "getChangedFiles"
            );
          }
        })
        .filter((i) => i !== undefined);

      changedFiles = changedFiles.filter((item, index) => {
        return (
          changedFiles.findIndex((obj) => obj.fileName === item.fileName) ===
          index
        );
      });

      logger_logger.withInfo(
        "Successfully fetched changed files",
        integrationName,
        headSHA,
        "getChangedFiles"
      );

      return changedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error fetching changed files - ${error.message}`,
        integrationName,
        headSHA,
        "getChangedFiles"
      );
      throw error;
    }
  }

  async checkCommentExists({ octokit, context }) {
    logger_logger.withInfo(
      "Checking for existing comments...",
      integrationName,
      headSHA,
      "checkCommentExists"
    );

    if (IS_DEV) {
      logger_logger.withInfo(
        "Development mode enabled. Skipping comment check.",
        integrationName,
        headSHA,
        "checkCommentExists"
      );
      return null;
    }

    const { pull_request } = context.payload;

    try {
      const comments = await octokit.rest.issues.listComments({
        ...context.repo,
        issue_number: pull_request.number,
      });

      const existingComment = comments.data.find(
        (comment) =>
          comment.user.login === "github-actions[bot]" &&
          comment.body.includes(
            "<!-- ActionCommentIdentifier: atlan-contract-action -->"
          )
      );
      if (existingComment) {
        logger_logger.withInfo(
          "Found existing comment: " + existingComment?.id,
          integrationName,
          headSHA,
          "checkCommentExists"
        );
      } else {
        logger_logger.withInfo(
          "No existing comment found",
          integrationName,
          headSHA,
          "checkCommentExists"
        );
      }

      return existingComment;
    } catch (error) {
      logger_logger.withError(
        "Error checking for existing comments: " + error.message,
        integrationName,
        headSHA,
        "checkCommentExists"
      );
      throw error;
    }
  }

  async createIssueComment({
    octokit,
    context,
    content,
    comment_id = null,
    forceNewComment = false,
  }) {
    logger_logger.withInfo(
      "Creating an issue comment...",
      integrationName,
      headSHA,
      "createIssueComment"
    );

    const { pull_request } = context?.payload || {};

    content = `<!-- ActionCommentIdentifier: atlan-contract-action -->
${content}`;

    const commentObj = {
      ...context.repo,
      issue_number: pull_request.number,
      body: content,
    };

    if (IS_DEV) {
      logger_logger.withInfo(
        "Development mode enabled. Skipping comment creation.",
        integrationName,
        headSHA,
        "createIssueComment"
      );

      return content;
    }

    if (comment_id && !forceNewComment)
      return octokit.rest.issues.updateComment({ ...commentObj, comment_id });
    return octokit.rest.issues.createComment(commentObj);
  }

  async deleteComment({ octokit, context, comment_id }) {
    logger_logger.withInfo(
      `Deleted comment with ID ${comment_id}`,
      integrationName,
      headSHA,
      "deleteComment"
    );

    const { pull_request } = context.payload;

    return octokit.rest.issues.deleteComment({
      ...context.repo,
      issue_number: pull_request.number,
      comment_id,
    });
  }

  async renderDownstreamAssetsComment({
    asset,
    downstreamAssets,
    classifications,
  }) {
    logger_logger.withInfo(
      "Rendering Downstream Assets...",
      integrationName,
      headSHA,
      "renderDownstreamAssetsComment"
    );
    try {
      let impactedData = downstreamAssets.entities.map(
        ({
          displayText,
          guid,
          typeName,
          attributes,
          meanings,
          classificationNames,
        }) => {
          // Modifying the typeName and getting the readableTypeName
          let readableTypeName = typeName
            .toLowerCase()
            .replace(attributes.connectorName, "")
            .toUpperCase();

          // Filtering classifications based on classificationNames
          let classificationsObj = classifications.filter(({ name }) =>
            classificationNames.includes(name)
          );

          // Modifying the readableTypeName
          readableTypeName =
            readableTypeName.charAt(0).toUpperCase() +
            readableTypeName.slice(1).toLowerCase();

          return [
            guid,
            truncate(displayText),
            truncate(attributes.connectorName),
            truncate(readableTypeName),
            truncate(
              attributes?.userDescription || attributes?.description || ""
            ),
            attributes?.certificateStatus || "",
            truncate(
              [...attributes?.ownerUsers, ...attributes?.ownerGroups] || []
            ),
            truncate(
              meanings.map(
                ({ displayText, termGuid }) =>
                  `[${displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${termGuid}/overview?utm_source=dbt_github_action)`
              )
            ),
            truncate(
              classificationsObj?.map(
                ({ name, displayName }) => `\`${displayName}\``
              )
            ),
            attributes?.sourceURL || "",
          ];
        }
      );

      // Sorting the impactedData first by typeName and then by connectorName
      impactedData = impactedData.sort((a, b) => a[3].localeCompare(b[3]));
      impactedData = impactedData.sort((a, b) => a[2].localeCompare(b[2]));

      // Creating rows for the downstream table
      let rows = impactedData.map(
        ([
          guid,
          displayText,
          connectorName,
          typeName,
          description,
          certificateStatus,
          owners,
          meanings,
          classifications,
          sourceUrl,
        ]) => {
          // Getting connector and certification images
          const connectorImage = get_image_url_getConnectorImage(connectorName);
          const certificationImage = certificateStatus
            ? get_image_url_getCertificationImage(certificateStatus)
            : "";

          return [
            `${connectorImage} [${displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${guid}/overview?utm_source=dbt_github_action) ${certificationImage}`,
            `\`${typeName}\``,
            description,
            owners,
            meanings,
            classifications,
            sourceUrl ? `[Open in ${connectorName}](${sourceUrl})` : " ",
          ];
        }
      );

      const assetInfo = getContractAssetInfo(
        get_environment_variables_ATLAN_INSTANCE_URL,
        asset
      );

      // Generating the downstream table
      const downstreamTable = getDownstreamTable(
        get_environment_variables_ATLAN_INSTANCE_URL,
        downstreamAssets,
        rows,
        asset
      );

      // Generating the "View asset in Atlan" button
      const viewAssetButton = getViewAssetButton(get_environment_variables_ATLAN_INSTANCE_URL, asset);

      // Generating the final comment based on the presence of downstream assets
      if (downstreamAssets.entityCount > 0) {
        return `${assetInfo}

${downstreamTable}

${viewAssetButton}`;
      } else {
        return `${assetInfo}

No downstream assets found.

${viewAssetButton}`;
      }
    } catch (error) {
      logger_logger.withError(
        `Error rendering Downstream Assets: ${error.message}`,
        integrationName,
        headSHA,
        "renderDownstreamAssetsComment"
      );
      throw error;
    }
  }

  readYamlFile(filePath) {
    try {
      // Read file content synchronously
      const data = external_fs_namespaceObject.readFileSync(filePath, 'utf8');
      
      // Parse the YAML data
      const parsedData = _notfoundjs_yaml.load(data);
      
      // Return parsed data
      return {
        contentString: data,
        contentYaml: parsedData
      };
    } catch (err) {
      return {
        error: err
      };
    }
  }

  parseDatasourceFromConfig(configYaml) {
    // Create a Map for keys starting with "data_source "
    const dataSourceMap = new Map();

    // Iterate through the object to find relevant keys
    for (const [key, value] of Object.entries(configYaml)) {
        if (key.startsWith('data_source ')) {
            // Trim the prefix and add to the Map
            const trimmedKey = key.replace('data_source ', '');
            dataSourceMap.set(trimmedKey, value);
        }
    }

    return dataSourceMap;
  }

  getQualifiedName(datasources, contractYaml) {
    if (contractYaml["data_source"] === undefined) {
      return;
    }

    if (!datasources.has(contractYaml.data_source)) {
      return;
    }

    let datasource = datasources.get(contractYaml.data_source)
    const qualifiedName = datasource?.connection?.qualified_name || '';
    const database = datasource?.database || '';
    const schema = datasource?.schema || '';
    // Format the output
    const assetQualifiedName = `${qualifiedName}/${database}/${schema}/${contractYaml.dataset}`;
    return assetQualifiedName;
  }
}

;// CONCATENATED MODULE: ./adapters/integrations/github-integration.js
// githubIntegration.js









var github_integration_headSHA;
const github_integration_integrationName = "github";
class GitHubIntegration extends IntegrationInterface {
  constructor(token) {
    super(token);
  }

  async run() {
    try {
      const timeStart = Date.now();
      const { context } = github;

      const octokit = github.getOctokit(this.token);
      const { pull_request } = context?.payload;
      const { state, merged } = pull_request;
      github_integration_headSHA = pull_request?.head?.sha;

      logger_logger.withInfo(
        "GitHub Integration is running...",
        github_integration_integrationName,
        github_integration_headSHA,
        "run"
      );

      if (!(await this.authIntegration({ octokit, context }))) {
        logger_logger.withError(
          "Authentication failed. Wrong API Token.",
          github_integration_integrationName,
          github_integration_headSHA,
          "run"
        );
        throw { message: "Wrong API Token" };
      }

      let total_assets = 0;

      if (state === "open") {
        total_assets = await this.printDownstreamAssets({ octokit, context });
      } else if (state === "closed" && merged) {
        total_assets = await this.setResourceOnAsset({ octokit, context });
      }

      if (total_assets !== 0) {
        await this.sendSegmentEventOfIntegration({
          action: "dbt_ci_action_run",
          properties: {
            asset_count: total_assets,
            total_time: Date.now() - timeStart,
          },
        });
      }

      logger_logger.withInfo(
        "Successfully Completed DBT_CI_ACTION",
        github_integration_integrationName,
        github_integration_headSHA,
        "run"
      );
    } catch (error) {
      logger_logger.withError(
        `Error in run(): ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "run"
      );
      throw error;
    }
  }

  async printDownstreamAssets({ octokit, context }) {
    logger_logger.withInfo(
      "Printing downstream assets...",
      github_integration_integrationName,
      github_integration_headSHA,
      "printDownstreamAssets"
    );

    try {
      const changedFiles = await this.getChangedFiles({ octokit, context });
      let comments = ``;
      let totalChangedFiles = 0;

      for (const { fileName, filePath, status } of changedFiles) {
        logger_logger.withInfo(
          `Processing file: ${fileName}`,
          github_integration_integrationName,
          github_integration_headSHA,
          "printDownstreamAssets"
        );
        const aliasName = await this.getAssetName({
          octokit,
          context,
          fileName,
          filePath,
        });
        const assetName = IGNORE_MODEL_ALIAS_MATCHING ? fileName : aliasName;

        const environments = getEnvironments();
        let environment = null;
        for (const [baseBranchName, environmentName] of environments) {
          if (baseBranchName === context.payload.pull_request.base.ref) {
            environment = environmentName;
            break;
          }
        }

        logger_logger.withInfo(
          `Processing asset: ${assetName} in environment: ${environment}`,
          github_integration_integrationName,
          github_integration_headSHA,
          "printDownstreamAssets"
        );
        const asset = await getAsset({
          name: assetName,
          sendSegmentEventOfIntegration: this.sendSegmentEventOfIntegration,
          environment: environment,
          integration: "github",
        });

        if (totalChangedFiles !== 0) comments += "\n\n---\n\n";

        if (status === "added") {
          logger_logger.withInfo(
            `New model added: ${fileName}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "printDownstreamAssets"
          );
          comments += getNewModelAddedComment(fileName);
          totalChangedFiles++;
          continue;
        }

        if (asset.error) {
          logger_logger.withError(
            `Asset error for ${assetName}: ${asset.error}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "printDownstreamAssets"
          );
          comments += asset.error;
          totalChangedFiles++;
          continue;
        }

        const materialisedAsset = asset?.attributes?.dbtModelSqlAssets?.[0];
        const timeStart = Date.now();

        const totalModifiedFiles = changedFiles.filter(
          (i) => i.status === "modified"
        ).length;

        const downstreamAssets = await getDownstreamAssets(
          asset,
          materialisedAsset.guid,
          totalModifiedFiles,
          this.sendSegmentEventOfIntegration,
          "github"
        );

        if (downstreamAssets.error) {
          logger_logger.withError(
            `Downstream assets error for ${assetName}: ${downstreamAssets.error}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "printDownstreamAssets"
          );
          comments += downstreamAssets.error;
          totalChangedFiles++;
          continue;
        }

        this.sendSegmentEventOfIntegration({
          action: "dbt_ci_action_downstream_unfurl",
          properties: {
            asset_guid: asset.guid,
            asset_type: asset.typeName,
            downstream_count: downstreamAssets.entities.length,
            total_fetch_time: Date.now() - timeStart,
          },
        });

        const classifications = await getClassifications({
          sendSegmentEventOfIntegration: this.sendSegmentEventOfIntegration,
        });

        const comment = await this.renderDownstreamAssetsComment({
          octokit,
          context,
          asset,
          materialisedAsset,
          downstreamAssets,
          classifications,
        });

        comments += comment;

        totalChangedFiles++;
      }

      comments = getBaseComment(totalChangedFiles, comments);

      const existingComment = await this.checkCommentExists({
        octokit,
        context,
      });

      logger_logger.withInfo(
        `Existing Comment: ${existingComment?.id}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "printDownstreamAssets"
      );

      if (totalChangedFiles > 0)
        await this.createIssueComment({
          octokit,
          context,
          content: comments,
          comment_id: existingComment?.id,
        });

      if (totalChangedFiles === 0 && existingComment)
        await this.deleteComment({
          octokit,
          context,
          comment_id: existingComment?.id,
        });

      logger_logger.withInfo(
        "Successfully printed Downstream Assets",
        github_integration_integrationName,
        github_integration_headSHA,
        "printDownstreamAssets"
      );

      return totalChangedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error in printDownstreamAssets: ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "printDownstreamAssets"
      );
      throw error;
    }
  }

  async setResourceOnAsset({ octokit, context }) {
    logger_logger.withInfo(
      "Setting resources on assets...",
      github_integration_integrationName,
      github_integration_headSHA,
      "setResourceOnAsset"
    );

    try {
      const changedFiles = await this.getChangedFiles({ octokit, context });
      const { pull_request } = context.payload;
      var totalChangedFiles = 0;
      let tableMd = ``;
      let setResourceFailed = false;

      if (changedFiles.length === 0) {
        logger_logger.withInfo(
          "No changed files found. Skipping resource setup.",
          github_integration_integrationName,
          github_integration_headSHA,
          "setResourceOnAsset"
        );
        return totalChangedFiles;
      }

      for (const { fileName, filePath } of changedFiles) {
        logger_logger.withInfo(
          `Processing file: ${fileName}`,
          github_integration_integrationName,
          github_integration_headSHA,
          "setResourceOnAsset"
        );
        const aliasName = await this.getAssetName({
          octokit,
          context,
          fileName,
          filePath,
        });

        const assetName = IGNORE_MODEL_ALIAS_MATCHING ? fileName : aliasName;

        logger_logger.withInfo(
          `Resolved asset name: ${assetName}`,
          github_integration_integrationName,
          github_integration_headSHA,
          "setResourceOnAsset"
        );

        const environments = getEnvironments();
        let environment = null;
        for (const [baseBranchName, environmentName] of environments) {
          if (baseBranchName === context.payload.pull_request.base.ref) {
            environment = environmentName;
            break;
          }
        }

        logger_logger.withInfo(
          `Processing asset: ${assetName} in environment: ${environment}`,
          github_integration_integrationName,
          github_integration_headSHA,
          "setResourceOnAsset"
        );

        const asset = await getAsset({
          name: assetName,
          sendSegmentEventOfIntegration: this.sendSegmentEventOfIntegration,
          environment: environment,
          integration: "github",
        });

        if (asset.error) {
          logger_logger.withError(
            `Failed to retrieve asset: ${assetName}, Error: ${asset.error}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "setResourceOnAsset"
          );
          continue;
        }

        const materialisedAsset = asset?.attributes?.dbtModelSqlAssets?.[0];
        const timeStart = Date.now();

        const totalModifiedFiles = changedFiles.filter(
          (i) => i.status === "modified"
        ).length;

        const downstreamAssets = await getDownstreamAssets(
          asset,
          materialisedAsset.guid,
          totalModifiedFiles,
          this.sendSegmentEventOfIntegration,
          "github"
        );

        if (downstreamAssets.error) {
          logger_logger.withError(
            `Failed to retrieve downstream assets for: ${assetName}, Error: ${downstreamAssets.error}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "setResourceOnAsset"
          );
          continue;
        }

        this.sendSegmentEventOfIntegration({
          action: "dbt_ci_action_downstream_unfurl",
          properties: {
            asset_guid: asset.guid,
            asset_type: asset.typeName,
            downstream_count: downstreamAssets.entities.length,
            total_fetch_time: Date.now() - timeStart,
          },
        });

        const model = asset;
        const materialisedView = asset?.attributes?.dbtModelSqlAssets?.[0];

        let PR_TITLE = pull_request.title;

        if (downstreamAssets.entityCount != 0) {
          if (model) {
            const { guid: modelGuid } = model;
            const resp = await createResource(
              modelGuid,
              PR_TITLE,
              pull_request.html_url,
              this.sendSegmentEventOfIntegration
            );

            const md = getMDCommentForModel(get_environment_variables_ATLAN_INSTANCE_URL, model);

            tableMd += getTableMD(md, resp);
            if (!resp) {
              setResourceFailed = true;
              logger_logger.withError(
                `Setting resource failed for model: ${modelGuid}`,
                github_integration_integrationName,
                github_integration_headSHA,
                "setResourceOnAsset"
              );
            }
          }

          if (materialisedView) {
            const { guid: tableAssetGuid } = materialisedView;
            const resp = await createResource(
              tableAssetGuid,
              PR_TITLE,
              pull_request.html_url,
              this.sendSegmentEventOfIntegration
            );

            const md = getMDCommentForMaterialisedView(
              get_environment_variables_ATLAN_INSTANCE_URL,
              materialisedView
            );

            tableMd += getTableMD(md, resp);
            if (!resp) {
              setResourceFailed = true;
              logger_logger.withError(
                `Setting resource failed for materialized view: ${tableAssetGuid}`,
                github_integration_integrationName,
                github_integration_headSHA,
                "setResourceOnAsset"
              );
            }
          }
        }
        totalChangedFiles++;
      }

      const comment = await this.createIssueComment({
        octokit,
        context,
        content: getSetResourceOnAssetComment(tableMd, setResourceFailed),
        comment_id: null,
        forceNewComment: true,
      });

      logger_logger.withInfo(
        "Successfully set the resource on the asset",
        github_integration_integrationName,
        github_integration_headSHA,
        "setResourceOnAsset"
      );

      return totalChangedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error in setResourceOnAsset: ${error}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "setResourceOnAsset"
      );
      throw error;
    }
  }

  async authIntegration({ octokit, context }) {
    logger_logger.withInfo(
      "Authenticating with Atlan",
      github_integration_integrationName,
      github_integration_headSHA,
      "authIntegration"
    );

    try {
      const response = await auth();

      const existingComment = await this.checkCommentExists({
        octokit,
        context,
      });

      logger_logger.withInfo(
        `Existing Comment: ${existingComment?.id}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "authIntegration"
      );

      if (response?.status === 401) {
        logger_logger.withError(
          "Authentication failed: Status 401",
          github_integration_integrationName,
          github_integration_headSHA,
          "authIntegration"
        );
        await this.createIssueComment({
          octokit,
          context,
          content: getErrorResponseStatus401(get_environment_variables_ATLAN_INSTANCE_URL, context),
          comment_id: existingComment?.id,
        });
        return false;
      }

      if (response === undefined) {
        logger_logger.withError(
          "Authentication failed: Undefined response",
          github_integration_integrationName,
          github_integration_headSHA,
          "authIntegration"
        );
        await this.createIssueComment({
          octokit,
          context,
          content: getErrorResponseStatusUndefined(get_environment_variables_ATLAN_INSTANCE_URL, context),
          comment_id: existingComment?.id,
        });
        return false;
      }
      logger_logger.withInfo(
        "Successfully Authenticated with Atlan",
        github_integration_integrationName,
        github_integration_headSHA,
        "authIntegration"
      );
      return true;
    } catch (error) {
      logger_logger.withError(
        `Error in authIntegration: ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "authIntegration"
      );
      throw error;
    }
  }

  async sendSegmentEventOfIntegration({ action, properties }) {
    try {
      const domain = new URL(get_environment_variables_ATLAN_INSTANCE_URL).hostname;
      const { context } = github; //confirm this
      logger_logger.withInfo(
        `Sending Segment event for action: ${action}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "sendSegmentEventOfIntegration"
      );

      const raw = _notfoundjson_stringify_safe({
        category: "integration",
        object: "github",
        action,
        userId: "atlan-annonymous-github",
        properties: {
          ...properties,
          github_action_id: `https://github.com/${context?.payload?.repository?.full_name}/actions/runs/${context?.runId}`,
          domain,
        },
      });

      return sendSegmentEvent(action, raw);
    } catch (error) {
      logger_logger.withError(
        `Error sending Segment event for action: ${action} - ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "sendSegmentEventOfIntegration"
      );
      throw error;
    }
  }

  async getChangedFiles({ octokit, context }) {
    try {
      logger_logger.withInfo(
        "Fetching changed files...",
        github_integration_integrationName,
        github_integration_headSHA,
        "getChangedFiles"
      );

      const { repository, pull_request } = context.payload,
        owner = repository.owner.login,
        repo = repository.name,
        pull_number = pull_request.number;

      const res = await octokit.request(
        `GET /repos/${owner}/${repo}/pulls/${pull_number}/files`,
        {
          owner,
          repo,
          pull_number,
        }
      );

      var changedFiles = res.data
        .map(({ filename, status }) => {
          try {
            const [modelName] = filename
              .match(/.*models\/(.*)\.sql/)[1]
              .split("/")
              .reverse()[0]
              .split(".");

            if (modelName) {
              return {
                fileName: modelName,
                filePath: filename,
                status,
              };
            }
          } catch (e) {
            logger_logger.withError(
              `Error processing file: ${filename} - ${e.message}`,
              github_integration_integrationName,
              github_integration_headSHA,
              "getChangedFiles"
            );
          }
        })
        .filter((i) => i !== undefined);

      changedFiles = changedFiles.filter((item, index) => {
        return (
          changedFiles.findIndex((obj) => obj.fileName === item.fileName) ===
          index
        );
      });

      logger_logger.withInfo(
        "Successfully fetched changed files",
        github_integration_integrationName,
        github_integration_headSHA,
        "getChangedFiles"
      );

      return changedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error fetching changed files - ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "getChangedFiles"
      );
      throw error;
    }
  }

  async getAssetName({ octokit, context, fileName, filePath }) {
    try {
      logger_logger.withInfo(
        "Getting asset name...",
        github_integration_integrationName,
        github_integration_headSHA,
        "getAssetName"
      );

      var regExp =
        /{{\s*config\s*\(\s*(?:[^,]*,)*\s*alias\s*=\s*['"]([^'"]+)['"](?:\s*,[^,]*)*\s*\)\s*}}/im;
      var fileContents = await this.getFileContents({
        octokit,
        context,
        filePath,
      });

      if (fileContents) {
        var matches = regExp.exec(fileContents);
        if (matches) {
          logger_logger.withInfo(
            `Found a match: ${matches[1].trim()}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "getAssetName"
          );
          return matches[1].trim();
        }
      }
      logger_logger.withInfo(
        `Using filename as asset name: ${fileName}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "getAssetName"
      );
      return fileName;
    } catch (error) {
      logger_logger.withError(
        `Error getting asset name - ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "getAssetName"
      );
      throw error;
    }
  }

  async getFileContents({ octokit, context, filePath }) {
    try {
      logger_logger.withInfo(
        "Fetching file contents...",
        github_integration_integrationName,
        github_integration_headSHA,
        "getFileContents"
      );

      const { repository, pull_request } = context.payload,
        owner = repository.owner.login,
        repo = repository.name,
        head_sha = pull_request.head.sha;

      const res = await octokit
        .request(
          `GET /repos/${owner}/${repo}/contents/${filePath}?ref=${head_sha}`,
          {
            owner,
            repo,
            path: filePath,
          }
        )
        .catch((e) => {
          logger_logger.withError(
            `Error fetching file contents: ${e.message}`,
            github_integration_integrationName,
            github_integration_headSHA,
            "getFileContents"
          );
          return null;
        });

      if (!res) return null;

      const buff = Buffer.from(res.data.content, "base64");

      logger_logger.withInfo(
        "Successfully fetched file contents",
        github_integration_integrationName,
        github_integration_headSHA,
        "getFileContents"
      );

      return buff.toString("utf8");
    } catch (error) {
      logger_logger.withError(
        `Error in getFileContents: ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "getFileContents"
      );
      throw error;
    }
  }

  async checkCommentExists({ octokit, context }) {
    logger_logger.withInfo(
      "Checking for existing comments...",
      github_integration_integrationName,
      github_integration_headSHA,
      "checkCommentExists"
    );

    if (IS_DEV) {
      logger_logger.withInfo(
        "Development mode enabled. Skipping comment check.",
        github_integration_integrationName,
        github_integration_headSHA,
        "checkCommentExists"
      );
      return null;
    }

    const { pull_request } = context.payload;

    try {
      const comments = await octokit.rest.issues.listComments({
        ...context.repo,
        issue_number: pull_request.number,
      });

      const existingComment = comments.data.find(
        (comment) =>
          comment.user.login === "github-actions[bot]" &&
          comment.body.includes(
            "<!-- ActionCommentIdentifier: atlan-dbt-action -->"
          )
      );
      if (existingComment) {
        logger_logger.withInfo(
          "Found existing comment: " + existingComment?.id,
          github_integration_integrationName,
          github_integration_headSHA,
          "checkCommentExists"
        );
      } else {
        logger_logger.withInfo(
          "No existing comment found",
          github_integration_integrationName,
          github_integration_headSHA,
          "checkCommentExists"
        );
      }

      return existingComment;
    } catch (error) {
      logger_logger.withError(
        "Error checking for existing comments: " + error.message,
        github_integration_integrationName,
        github_integration_headSHA,
        "checkCommentExists"
      );
      throw error;
    }
  }

  async createIssueComment({
    octokit,
    context,
    content,
    comment_id = null,
    forceNewComment = false,
  }) {
    logger_logger.withInfo(
      "Creating an issue comment...",
      github_integration_integrationName,
      github_integration_headSHA,
      "createIssueComment"
    );

    const { pull_request } = context?.payload || {};

    content = `<!-- ActionCommentIdentifier: atlan-dbt-action -->
${content}`;

    const commentObj = {
      ...context.repo,
      issue_number: pull_request.number,
      body: content,
    };

    if (IS_DEV) {
      logger_logger.withInfo(
        "Development mode enabled. Skipping comment creation.",
        github_integration_integrationName,
        github_integration_headSHA,
        "createIssueComment"
      );

      return content;
    }

    if (comment_id && !forceNewComment)
      return octokit.rest.issues.updateComment({ ...commentObj, comment_id });
    return octokit.rest.issues.createComment(commentObj);
  }

  async deleteComment({ octokit, context, comment_id }) {
    logger_logger.withInfo(
      `Deleted comment with ID ${comment_id}`,
      github_integration_integrationName,
      github_integration_headSHA,
      "deleteComment"
    );

    const { pull_request } = context.payload;

    return octokit.rest.issues.deleteComment({
      ...context.repo,
      issue_number: pull_request.number,
      comment_id,
    });
  }

  async renderDownstreamAssetsComment({
    octokit,
    context,
    asset,
    materialisedAsset,
    downstreamAssets,
    classifications,
  }) {
    logger_logger.withInfo(
      "Rendering Downstream Assets...",
      github_integration_integrationName,
      github_integration_headSHA,
      "renderDownstreamAssetsComment"
    );
    try {
      let impactedData = downstreamAssets.entities.map(
        ({
          displayText,
          guid,
          typeName,
          attributes,
          meanings,
          classificationNames,
        }) => {
          // Modifying the typeName and getting the readableTypeName
          let readableTypeName = typeName
            .toLowerCase()
            .replace(attributes.connectorName, "")
            .toUpperCase();

          // Filtering classifications based on classificationNames
          let classificationsObj = classifications.filter(({ name }) =>
            classificationNames.includes(name)
          );

          // Modifying the readableTypeName
          readableTypeName =
            readableTypeName.charAt(0).toUpperCase() +
            readableTypeName.slice(1).toLowerCase();

          return [
            guid,
            truncate(displayText),
            truncate(attributes.connectorName),
            truncate(readableTypeName),
            truncate(
              attributes?.userDescription || attributes?.description || ""
            ),
            attributes?.certificateStatus || "",
            truncate(
              [...attributes?.ownerUsers, ...attributes?.ownerGroups] || []
            ),
            truncate(
              meanings.map(
                ({ displayText, termGuid }) =>
                  `[${displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${termGuid}/overview?utm_source=dbt_github_action)`
              )
            ),
            truncate(
              classificationsObj?.map(
                ({ name, displayName }) => `\`${displayName}\``
              )
            ),
            attributes?.sourceURL || "",
          ];
        }
      );

      // Sorting the impactedData first by typeName and then by connectorName
      impactedData = impactedData.sort((a, b) => a[3].localeCompare(b[3]));
      impactedData = impactedData.sort((a, b) => a[2].localeCompare(b[2]));

      // Creating rows for the downstream table
      let rows = impactedData.map(
        ([
          guid,
          displayText,
          connectorName,
          typeName,
          description,
          certificateStatus,
          owners,
          meanings,
          classifications,
          sourceUrl,
        ]) => {
          // Getting connector and certification images
          const connectorImage = get_image_url_getConnectorImage(connectorName);
          const certificationImage = certificateStatus
            ? get_image_url_getCertificationImage(certificateStatus)
            : "";

          return [
            `${connectorImage} [${displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${guid}/overview?utm_source=dbt_github_action) ${certificationImage}`,
            `\`${typeName}\``,
            description,
            owners,
            meanings,
            classifications,
            sourceUrl ? `[Open in ${connectorName}](${sourceUrl})` : " ",
          ];
        }
      );

      const environmentName =
        materialisedAsset?.attributes?.assetDbtEnvironmentName;
      const projectName = materialisedAsset?.attributes?.assetDbtProjectName;
      // Generating asset information

      const assetInfo = getAssetInfo(
        get_environment_variables_ATLAN_INSTANCE_URL,
        asset,
        materialisedAsset,
        environmentName,
        projectName
      );

      // Generating the downstream table
      const downstreamTable = getDownstreamTable(
        get_environment_variables_ATLAN_INSTANCE_URL,
        downstreamAssets,
        rows,
        materialisedAsset
      );

      // Generating the "View asset in Atlan" button
      const viewAssetButton = getViewAssetButton(get_environment_variables_ATLAN_INSTANCE_URL, asset);

      // Generating the final comment based on the presence of downstream assets
      if (downstreamAssets.entities.length > 0) {
        return `${assetInfo}

${downstreamTable}

${viewAssetButton}`;
      } else {
        return `${assetInfo}

No downstream assets found.

${viewAssetButton}`;
      }
    } catch (error) {
      logger_logger.withError(
        `Error rendering Downstream Assets: ${error.message}`,
        github_integration_integrationName,
        github_integration_headSHA,
        "renderDownstreamAssetsComment"
      );
      throw error;
    }
  }
}

// EXTERNAL MODULE: ../../../../../usr/local/lib/node_modules/@vercel/ncc/dist/ncc/@@notfound.js?@gitbeaker/rest
var rest = __nccwpck_require__(723);
;// CONCATENATED MODULE: ./adapters/templates/gitlab-integration.js


function gitlab_integration_getErrorResponseStatus401 (ATLAN_INSTANCE_URL, CI_PROJECT_NAME, CI_PROJECT_NAMESPACE) {
    return `We couldn't connect to your Atlan Instance, please make sure to set the valid Atlan Bearer Token as \`ATLAN_API_TOKEN\` as this repository's CI/CD variable. 

Atlan Instance URL: ${ATLAN_INSTANCE_URL}
    
Set your CI/CD variables [here](https://gitlab.com/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}/-/settings/ci_cd). For more information on how to setup the Atlan Action, please read the [setup documentation here](https://ask.atlan.com/hc/en-us/articles/8284983222415).`
}

function gitlab_integration_getErrorResponseStatusUndefined(ATLAN_INSTANCE_URL, CI_PROJECT_NAME, CI_PROJECT_NAMESPACE) {
    return `We couldn't connect to your Atlan Instance, please make sure to set the valid Atlan Instance URL as \`ATLAN_INSTANCE_URL\` as this repository's CI/CD variable. 

Atlan Instance URL: ${ATLAN_INSTANCE_URL}
    
Make sure your Atlan Instance URL is set in the following format.
\`https://tenant.atlan.com\`
    
Set your CI/CD variables [here](https://gitlab.com/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}/-/settings/ci_cd). For more information on how to setup the Atlan Action, please read the [setup documentation here](https://ask.atlan.com/hc/en-us/articles/8284983222415).`
}

function gitlab_integration_getSetResourceOnAssetComment(tableMd, setResourceFailed) {
    return `## 🎊 Congrats on the merge!
  
  This pull request has been added as a resource to the following assets:
    
  ${setResourceFailed ? '> ⚠️  Seems like we were unable to set the resources for some of the assets due to insufficient permissions. To ensure that the pull request is linked as a resource, you will need to assign the right persona with requisite permissions to the API token.' : ''}
    
  Name | Resource set successfully
  --- | ---
  ${tableMd}
  `
}

function gitlab_integration_getAssetInfo(ATLAN_INSTANCE_URL, asset, materialisedAsset, environmentName, projectName) {
  return `### ${get_image_url_getConnectorImage(
      asset.attributes.connectorName
    )} [${asset.displayText}](${ATLAN_INSTANCE_URL}/assets/${
      asset.guid
    }/overview?utm_source=dbt_gitlab_action) ${
      asset.attributes?.certificateStatus
        ? get_image_url_getCertificationImage(asset.attributes.certificateStatus)
        : ""
    }
Materialised asset: ${get_image_url_getConnectorImage(
      materialisedAsset.attributes.connectorName
    )} [${materialisedAsset.attributes.name}](${ATLAN_INSTANCE_URL}/assets/${
      materialisedAsset.guid
    }/overview?utm_source=dbt_gitlab_action) ${
      materialisedAsset.attributes?.certificateStatus
        ? get_image_url_getCertificationImage(materialisedAsset.attributes.certificateStatus)
        : ""
    }${environmentName ? ` | Environment Name: \`${environmentName}\`` : ""}${
      projectName ? ` | Project Name: \`${projectName}\`` : ""
    }`
}

function gitlab_integration_getDownstreamTable(ATLAN_INSTANCE_URL, downstreamAssets, rows, materialisedAsset) {
  return `<details><summary><b>${
      downstreamAssets.entityCount
    } downstream assets 👇</b></summary><br/>

Name | Type | Description | Owners | Terms | Classifications | Source URL
--- | --- | --- | --- | --- | --- | ---
${rows
  .map((row) =>
    row.map((i) => i.replace(/\|/g, "•").replace(/\n/g, "")).join(" | ")
  )
  .join("\n")}

${
  downstreamAssets.hasMore
    ? `[See more downstream assets at Atlan](${ATLAN_INSTANCE_URL}/assets/${materialisedAsset.guid}/lineage?utm_source=dbt_gitlab_action)`
    : ""
}

</details>`
}

function gitlab_integration_getViewAssetButton(ATLAN_INSTANCE_URL, asset) {
  return `${get_image_url_getImageURL(
      "atlan-logo",
      15,
      15
    )} [View asset in Atlan](${ATLAN_INSTANCE_URL}/assets/${
      asset.guid
    }/overview?utm_source=dbt_gitlab_action)`
}

function gitlab_integration_getMDCommentForModel(ATLAN_INSTANCE_URL, model) {
  return `${get_image_url_getConnectorImage(model?.attributes?.connectorName)} [${
      model?.displayText
    }](${ATLAN_INSTANCE_URL}/assets/${model?.guid}/overview?utm_source=dbt_gitlab_action)`
}

function gitlab_integration_getMDCommentForMaterialisedView(ATLAN_INSTANCE_URL, materialisedView) {
  return `${get_image_url_getConnectorImage(materialisedView?.attributes?.connectorName)} [${
      materialisedView?.attributes?.name
    }](${ATLAN_INSTANCE_URL}/assets/${materialisedView?.guid}/overview?utm_source=dbt_gitlab_action)`
}

function gitlab_integration_getTableMD(md, resp) {
  return `${md} | ${resp ? '✅' : '❌'} \n`
}
;// CONCATENATED MODULE: ./adapters/integrations/gitlab-integration.js
// gitlabIntegration.js









const gitlab_integration_integrationName = "gitlab";
var CI_MERGE_REQUEST_IID;

class GitLabIntegration extends IntegrationInterface {
  constructor(token) {
    super(token);
  }

  async run() {
    try {
      const timeStart = Date.now();
      const gitlab = new rest.Gitlab({
        host: "https://gitlab.com",
        token: this.token,
      });

      CI_MERGE_REQUEST_IID = await getCIMergeRequestIID(
        gitlab,
        CI_PROJECT_ID,
        CI_COMMIT_SHA
      );

      var mergeRequestCommit = await gitlab.Commits.allMergeRequests(
        CI_PROJECT_ID,
        CI_COMMIT_SHA
      );

      logger_logger.withInfo(
        "GitLab Integration is running...",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "run"
      );

      if (!(await this.authIntegration({ gitlab }))) {
        logger_logger.withError(
          "Authentication failed. Wrong API Token.",
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "run"
        );
        throw { message: "Wrong API Token" };
      }

      let total_assets = 0;

      if (
        mergeRequestCommit.length &&
        mergeRequestCommit[0]?.state == "merged"
      ) {
        const { web_url, target_branch, diff_refs } =
          await gitlab.MergeRequests.show(
            CI_PROJECT_PATH,
            mergeRequestCommit[0]?.iid
          );
        total_assets = await this.setResourceOnAsset({
          gitlab,
          web_url,
          target_branch,
          diff_refs,
        });
      } else {
        const { target_branch, diff_refs } = await gitlab.MergeRequests.show(
          CI_PROJECT_PATH,
          CI_MERGE_REQUEST_IID
        );

        total_assets = await this.printDownstreamAssets({
          gitlab,
          target_branch,
          diff_refs,
        });
      }

      if (total_assets !== 0)
        await this.sendSegmentEventOfIntegration({
          action: "dbt_ci_action_run",
          properties: {
            asset_count: total_assets,
            total_time: Date.now() - timeStart,
          },
        });

      logger_logger.withInfo(
        "Successfully Completed DBT_CI_PIPELINE",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "run"
      );
    } catch (error) {
      logger_logger.withError(
        `Error in run(): ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "run"
      );
      throw error;
    }
  }

  async printDownstreamAssets({ gitlab, target_branch, diff_refs }) {
    logger_logger.withInfo(
      "Printing downstream assets...",
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "printDownstreamAssets"
    );

    try {
      const changedFiles = await this.getChangedFiles({ gitlab, diff_refs });

      let comments = ``;
      let totalChangedFiles = 0;

      for (const { fileName, filePath, headSHA, status } of changedFiles) {
        logger_logger.withInfo(
          `Processing file: ${fileName}`,
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "printDownstreamAssets"
        );
        const aliasName = await this.getAssetName({
          gitlab,
          fileName,
          filePath,
          headSHA,
        });
        const assetName = IGNORE_MODEL_ALIAS_MATCHING ? fileName : aliasName;

        const environments = getGitLabEnvironments();
        let environment = null;
        for (const baseBranchName of Object.keys(environments)) {
          const environmentName = environments[baseBranchName];
          if (baseBranchName === target_branch) {
            environment = environmentName;
            break;
          }
        }

        logger_logger.withInfo(
          `Processing asset: ${assetName} in environment: ${environment}`,
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "printDownstreamAssets"
        );

        const asset = await getAsset({
          name: assetName,
          sendSegmentEventOfIntegration: this.sendSegmentEventOfIntegration,
          environment: environment,
          integration: "gitlab",
        });

        if (totalChangedFiles !== 0) comments += "\n\n---\n\n";

        if (status === "added") {
          logger_logger.withInfo(
            `New model added: ${fileName}`,
            gitlab_integration_integrationName,
            CI_COMMIT_SHA,
            "printDownstreamAssets"
          );
          comments += getNewModelAddedComment(fileName);
          totalChangedFiles++;
          continue;
        }

        if (asset.error) {
          logger_logger.withError(
            `Asset error for ${assetName}: ${asset.error}`,
            gitlab_integration_integrationName,
            CI_COMMIT_SHA,
            "printDownstreamAssets"
          );
          comments += asset.error;
          totalChangedFiles++;
          continue;
        }

        const materialisedAsset = asset?.attributes?.dbtModelSqlAssets?.[0];
        const timeStart = Date.now();

        const totalModifiedFiles = changedFiles.filter(
          (i) => i.status === "modified"
        ).length;

        const { guid } = asset;

        const downstreamAssets = await getDownstreamAssets(
          asset,
          materialisedAsset.guid,
          totalModifiedFiles,
          this.sendSegmentEventOfIntegration,
          "gitlab"
        );

        if (downstreamAssets.error) {
          logger_logger.withError(
            `Downstream assets error for ${assetName}: ${downstreamAssets.error}`,
            gitlab_integration_integrationName,
            CI_COMMIT_SHA,
            "printDownstreamAssets"
          );
          comments += downstreamAssets.error;
          totalChangedFiles++;
          continue;
        }

        this.sendSegmentEventOfIntegration({
          action: "dbt_ci_action_downstream_unfurl",
          properties: {
            asset_guid: asset.guid,
            asset_type: asset.typeName,
            downstream_count: downstreamAssets.entities.length,
            total_fetch_time: Date.now() - timeStart,
          },
        });

        const classifications = await getClassifications({
          sendSegmentEventOfIntegration: this.sendSegmentEventOfIntegration,
        });

        const comment = await this.renderDownstreamAssetsComment({
          asset,
          downstreamAssets,
          classifications,
          materialisedAsset,
        });

        comments += comment;

        totalChangedFiles++;
      }

      comments = getBaseComment(totalChangedFiles, comments);

      const existingComment = await this.checkCommentExists({ gitlab });

      logger_logger.withInfo(
        `Existing Comment: ${existingComment?.id}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "printDownstreamAssets"
      );

      if (totalChangedFiles > 0)
        await this.createIssueComment({
          gitlab,
          content: comments,
          comment_id: existingComment?.id,
        });

      if (totalChangedFiles === 0 && existingComment)
        await this.deleteComment({ gitlab, comment_id: existingComment?.id });

      logger_logger.withInfo(
        "Successfully printed Downstream Assets",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "printDownstreamAssets"
      );

      return totalChangedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error in printDownstreamAssets: ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "printDownstreamAssets"
      );
      throw error;
    }
  }

  async setResourceOnAsset({ gitlab, web_url, target_branch, diff_refs }) {
    logger_logger.withInfo(
      "Setting resources on assets...",
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "setResourceOnAsset"
    );

    try {
      const changedFiles = await this.getChangedFiles({ gitlab, diff_refs });

      var totalChangedFiles = 0;
      let tableMd = ``;
      let setResourceFailed = false;
      if (changedFiles.length === 0) {
        logger_logger.withInfo(
          "No changed files found. Skipping resource setup.",
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "setResourceOnAsset"
        );
        return totalChangedFiles;
      }

      for (const { fileName, filePath, headSHA } of changedFiles) {
        const aliasName = await this.getAssetName({
          gitlab,
          fileName,
          filePath,
          headSHA,
        });

        const assetName = IGNORE_MODEL_ALIAS_MATCHING ? fileName : aliasName;

        logger_logger.withInfo(
          `Resolved asset name: ${assetName}`,
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "setResourceOnAsset"
        );

        const environments = getGitLabEnvironments();
        let environment = null;
        for (const baseBranchName of Object.keys(environments)) {
          const environmentName = environments[baseBranchName];
          if (baseBranchName === target_branch) {
            environment = environmentName;
            break;
          }
        }

        logger_logger.withInfo(
          `Processing asset: ${assetName} in environment: ${environment}`,
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "setResourceOnAsset"
        );

        const asset = await getAsset({
          name: assetName,
          sendSegmentEventOfIntegration: this.sendSegmentEventOfIntegration,
          environment: environment,
          integration: "gitlab",
        });

        if (asset.error) {
          logger_logger.withError(
            `Failed to retrieve asset: ${assetName}, Error: ${asset.error}`,
            gitlab_integration_integrationName,
            CI_COMMIT_SHA,
            "setResourceOnAsset"
          );
          continue;
        }

        const materialisedAsset = asset?.attributes?.dbtModelSqlAssets?.[0];
        const timeStart = Date.now();

        const totalModifiedFiles = changedFiles.filter(
          (i) => i.status === "modified"
        ).length;

        const { guid } = asset;

        const downstreamAssets = await getDownstreamAssets(
          asset,
          materialisedAsset.guid,
          totalModifiedFiles,
          this.sendSegmentEventOfIntegration,
          "gitlab"
        );

        if (downstreamAssets.error) {
          logger_logger.withError(
            `Failed to retrieve downstream assets for: ${assetName}, Error: ${downstreamAssets.error}`,
            gitlab_integration_integrationName,
            CI_COMMIT_SHA,
            "setResourceOnAsset"
          );
          continue;
        }

        this.sendSegmentEventOfIntegration({
          action: "dbt_ci_action_downstream_unfurl",
          properties: {
            asset_guid: asset.guid,
            asset_type: asset.typeName,
            downstream_count: downstreamAssets.entities.length,
            total_fetch_time: Date.now() - timeStart,
          },
        });

        const model = asset;
        const materialisedView = asset?.attributes?.dbtModelSqlAssets?.[0];

        var lines = CI_COMMIT_MESSAGE.split("\n");
        var CI_MERGE_REQUEST_TITLE = lines[2];

        if (downstreamAssets.entityCount != 0) {
          if (model) {
            const { guid: modelGuid } = model;
            const resp = await createResource(
              modelGuid,
              CI_MERGE_REQUEST_TITLE,
              web_url,
              this.sendSegmentEventOfIntegration
            );
            const md = gitlab_integration_getMDCommentForModel(get_environment_variables_ATLAN_INSTANCE_URL, model);
            tableMd += gitlab_integration_getTableMD(md, resp);
            if (!resp) {
              setResourceFailed = true;
              logger_logger.withError(
                `Setting resource failed for model: ${modelGuid}`,
                gitlab_integration_integrationName,
                CI_COMMIT_SHA,
                "setResourceOnAsset"
              );
            }
          }

          if (materialisedView) {
            const { guid: tableAssetGuid } = materialisedView;
            const resp = await createResource(
              tableAssetGuid,
              CI_MERGE_REQUEST_TITLE,
              web_url,
              this.sendSegmentEventOfIntegration
            );
            const md = gitlab_integration_getMDCommentForMaterialisedView(
              get_environment_variables_ATLAN_INSTANCE_URL,
              materialisedView
            );
            tableMd += gitlab_integration_getTableMD(md, resp);
            if (!resp) {
              setResourceFailed = true;
              logger_logger.withError(
                `Setting resource failed for materialized view: ${tableAssetGuid}`,
                gitlab_integration_integrationName,
                CI_COMMIT_SHA,
                "setResourceOnAsset"
              );
            }
          }
        }

        totalChangedFiles++;
      }

      const comment = await this.createIssueComment({
        gitlab,
        content: gitlab_integration_getSetResourceOnAssetComment(tableMd, setResourceFailed),
        comment_id: null,
        forceNewComment: true,
      });

      logger_logger.withInfo(
        "Successfully set the resource on the asset",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "setResourceOnAsset"
      );

      return totalChangedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error in setResourceOnAsset: ${error}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "setResourceOnAsset"
      );
      throw error;
    }
  }

  async authIntegration({ gitlab }) {
    logger_logger.withInfo(
      "Authenticating with Atlan",
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "authIntegration"
    );

    try {
      const response = await auth();

      const existingComment = await this.checkCommentExists({ gitlab });

      logger_logger.withInfo(
        `Existing Comment: ${existingComment?.id}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "authIntegration"
      );

      if (response?.status === 401) {
        logger_logger.withError(
          "Authentication failed: Status 401",
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "authIntegration"
        );
        await this.createIssueComment({
          gitlab,
          content: gitlab_integration_getErrorResponseStatus401(
            get_environment_variables_ATLAN_INSTANCE_URL,
            CI_PROJECT_NAME,
            CI_PROJECT_NAMESPACE
          ),
          comment_id: existingComment?.id,
        });
        return false;
      }

      if (response === undefined) {
        logger_logger.withError(
          "Authentication failed: Undefined response",
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "authIntegration"
        );
        await this.createIssueComment({
          gitlab,
          content: gitlab_integration_getErrorResponseStatusUndefined(
            get_environment_variables_ATLAN_INSTANCE_URL,
            CI_PROJECT_NAME,
            CI_PROJECT_NAMESPACE
          ),
          comment_id: existingComment?.id,
        });
        return false;
      }
      logger_logger.withInfo(
        "Successfully Authenticated with Atlan",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "authIntegration"
      );
      return true;
    } catch (error) {
      logger_logger.withError(
        `Error in authIntegration: ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "authIntegration"
      );
      throw error;
    }
  }

  async createIssueComment({
    gitlab,
    content,
    comment_id = null,
    forceNewComment = false,
  }) {
    logger_logger.withInfo(
      "Creating an issue comment...",
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "createIssueComment"
    );

    content = `<!-- ActionCommentIdentifier: atlan-dbt-action -->
${content}`;

    if (IS_DEV) {
      logger_logger.withInfo(
        "Development mode enabled. Skipping comment creation.",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "createIssueComment"
      );
      return content;
    }

    if (comment_id && !forceNewComment) {
      return await gitlab.MergeRequestNotes.edit(
        CI_PROJECT_ID,
        CI_MERGE_REQUEST_IID,
        comment_id,
        {
          body: content,
        }
      );
    }
    return await gitlab.MergeRequestNotes.create(
      CI_PROJECT_PATH,
      CI_MERGE_REQUEST_IID,
      content
    );
  }

  async sendSegmentEventOfIntegration({ action, properties }) {
    try {
      const domain = new URL(get_environment_variables_ATLAN_INSTANCE_URL).hostname;
      logger_logger.withInfo(
        `Sending Segment event for action: ${action}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "sendSegmentEventOfIntegration"
      );

      const raw = _notfoundjson_stringify_safe({
        category: "integration",
        object: "gitlab",
        action,
        userId: "atlan-annonymous-github",
        properties: {
          ...properties,
          gitlab_job_id: CI_JOB_URL,
          domain,
        },
      });

      return sendSegmentEvent(action, raw);
    } catch (error) {
      logger_logger.withError(
        `Error sending Segment event for action: ${action} - ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "sendSegmentEventOfIntegration"
      );
      throw error;
    }
  }

  async getChangedFiles({ gitlab, diff_refs }) {
    try {
      logger_logger.withInfo(
        "Fetching changed files...",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getChangedFiles"
      );

      var changes = await gitlab.MergeRequests.allDiffs(
        CI_PROJECT_PATH,
        CI_MERGE_REQUEST_IID
      );

      var changedFiles = changes
        .map(({ new_path, old_path, new_file }) => {
          try {
            const [modelName] = new_path
              .match(/.*models\/(.*)\.sql/)[1]
              .split("/")
              .reverse()[0]
              .split(".");

            if (modelName) {
              if (new_file) {
                return {
                  fileName: modelName,
                  filePath: new_path,
                  headSHA: diff_refs.head_sha,
                  status: "added",
                };
              } else if (new_path !== old_path) {
                // File is renamed or moved
                return {
                  fileName: modelName,
                  filePath: new_path,
                  headSHA: diff_refs.head_sha,
                  status: "renamed_or_moved",
                };
              } else {
                // File is modified
                return {
                  fileName: modelName,
                  filePath: new_path,
                  headSHA: diff_refs.head_sha,
                  status: "modified",
                };
              }
            }
          } catch (e) {
            logger_logger.withError(
              `Error processing file`,
              gitlab_integration_integrationName,
              CI_COMMIT_SHA,
              "getChangedFiles"
            );
          }
        })
        .filter((i) => i !== undefined);

      changedFiles = changedFiles.filter((item, index) => {
        return (
          changedFiles.findIndex((obj) => obj.fileName === item.fileName) ===
          index
        );
      });

      logger_logger.withInfo(
        "Successfully fetched changed files",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getChangedFiles"
      );

      return changedFiles;
    } catch (error) {
      logger_logger.withError(
        `Error fetching changed files - ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getChangedFiles"
      );
      throw error;
    }
  }

  async getAssetName({ gitlab, fileName, filePath, headSHA }) {
    try {
      logger_logger.withInfo(
        "Getting asset name...",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getAssetName"
      );

      var regExp =
        /{{\s*config\s*\(\s*(?:[^,]*,)*\s*alias\s*=\s*['"]([^'"]+)['"](?:\s*,[^,]*)*\s*\)\s*}}/im;
      var fileContents = await this.getFileContents({
        gitlab,
        filePath,
        headSHA,
      });

      logger_logger.withInfo(
        `Successfully fetched file contents. File size: ${fileContents.length} bytes`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getAssetName"
      );      

      if (fileContents) {
        logger_logger.withInfo(
          "Starting regex matching",
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "getAssetName"
        );
        const startRegex =
            /{{\s*config\s*\(/im;
        const startMatch = fileContents.match(startRegex);
        let configSection = ''
        if (startMatch) {
          const startIndex = startMatch.index;
          const openParensIndex = fileContents.indexOf('(', startIndex) + 1;
          let openParensCount = 1;
          let endIndex = openParensIndex;

          while (openParensCount > 0 && endIndex < fileContents.length) {
            const char = fileContents[endIndex];

            if (char === '(') {
                openParensCount++;
            } else if (char === ')') {
                openParensCount--;
            }
            endIndex++;
            }
            
            const endMarker = '}}';
            const finalEndIndex = fileContents.indexOf(endMarker, endIndex) + endMarker.length;

            configSection = fileContents.substring(startIndex, finalEndIndex);
            logger_logger.withInfo(
              "Extracted config section",
              gitlab_integration_integrationName,
              CI_COMMIT_SHA,
              "getAssetName"
            );

            if (configSection){
              logger_logger.withInfo(
                "Executing final regex",
                gitlab_integration_integrationName,
                CI_COMMIT_SHA,
                "getAssetName"
              );

              var matches = regExp.exec(configSection);

              logger_logger.withInfo(
                "Successfully executed regex matching",
                gitlab_integration_integrationName,
                CI_COMMIT_SHA,
                "getAssetName"
              );

            }
            if (matches) {
              logger_logger.withInfo(
                `Found a match: ${matches[1].trim()}`,
                gitlab_integration_integrationName,
                CI_COMMIT_SHA,
                "getAssetName"
              );

              return matches[1].trim();
            }
        }
      }

      logger_logger.withInfo(
        `Using filename as asset name: ${fileName}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getAssetName"
      );

      return fileName;
    } catch (error) {
      logger_logger.withError(
        `Error getting asset name - ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getAssetName"
      );
      throw error;
    }
  }

  async getFileContents({ gitlab, filePath, headSHA }) {
    try {
      logger_logger.withInfo(
        "Fetching file contents...",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getFileContents"
      );

      const { content } = await gitlab.RepositoryFiles.show(
        CI_PROJECT_PATH,
        filePath,
        headSHA
      );
      const buff = Buffer.from(content, "base64");

      return buff.toString("utf8");
    } catch (error) {
      logger_logger.withError(
        `Error in getFileContents: ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "getFileContents"
      );
      throw error;
    }
  }

  async checkCommentExists({ gitlab }) {
    logger_logger.withInfo(
      "Checking for existing comments...",
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "checkCommentExists"
    );

    if (IS_DEV) {
      logger_logger.withInfo(
        "Development mode enabled. Skipping comment check.",
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "checkCommentExists"
      );
      return null;
    }

    try {
      const comments = await gitlab.MergeRequestNotes.all(
        CI_PROJECT_PATH,
        CI_MERGE_REQUEST_IID
      );

      const identifier = `project_${CI_PROJECT_ID}_bot_`;

      const existingComment = comments.find(
        (comment) =>
          comment.author.username.includes(identifier) &&
          comment.body.includes(
            "<!-- ActionCommentIdentifier: atlan-dbt-action -->"
          )
      );
      if (existingComment) {
        logger_logger.withInfo(
          "Found existing comment: " + existingComment?.id,
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "checkCommentExists"
        );
      } else {
        logger_logger.withInfo(
          "No existing comment found",
          gitlab_integration_integrationName,
          CI_COMMIT_SHA,
          "checkCommentExists"
        );
      }

      return existingComment;
    } catch (error) {
      logger_logger.withError(
        "Error checking for existing comments: " + error.message,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "checkCommentExists"
      );
      throw error;
    }
  }

  async deleteComment({ gitlab, comment_id }) {
    logger_logger.withInfo(
      `Deleted comment with ID ${comment_id}`,
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "deleteComment"
    );

    return await gitlab.MergeRequestNotes.remove(
      CI_PROJECT_PATH,
      CI_MERGE_REQUEST_IID,
      comment_id
    );
  }

  async renderDownstreamAssetsComment({
    asset,
    downstreamAssets,
    classifications,
    materialisedAsset,
  }) {
    logger_logger.withInfo(
      "Rendering Downstream Assets...",
      gitlab_integration_integrationName,
      CI_COMMIT_SHA,
      "renderDownstreamAssetsComment"
    );

    try {
      let impactedData = downstreamAssets.entities.map(
        ({
          displayText,
          guid,
          typeName,
          attributes,
          meanings,
          classificationNames,
        }) => {
          // Modifying the typeName and getting the readableTypeName
          let readableTypeName = typeName
            .toLowerCase()
            .replace(attributes.connectorName, "")
            .toUpperCase();

          // Filtering classifications based on classificationNames
          let classificationsObj = classifications.filter(({ name }) =>
            classificationNames.includes(name)
          );

          // Modifying the readableTypeName
          readableTypeName =
            readableTypeName.charAt(0).toUpperCase() +
            readableTypeName.slice(1).toLowerCase();

          return [
            guid,
            truncate(displayText),
            truncate(attributes.connectorName),
            truncate(readableTypeName),
            truncate(
              attributes?.userDescription || attributes?.description || ""
            ),
            attributes?.certificateStatus || "",
            truncate(
              [...attributes?.ownerUsers, ...attributes?.ownerGroups] || []
            ),
            truncate(
              meanings.map(
                ({ displayText, termGuid }) =>
                  `[${displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${termGuid}/overview?utm_source=dbt_gitlab_action)`
              )
            ),
            truncate(
              classificationsObj?.map(
                ({ name, displayName }) => `\`${displayName}\``
              )
            ),
            attributes?.sourceURL || "",
          ];
        }
      );

      // Sorting the impactedData first by typeName and then by connectorName
      impactedData = impactedData.sort((a, b) => a[3].localeCompare(b[3]));
      impactedData = impactedData.sort((a, b) => a[2].localeCompare(b[2]));

      // Creating rows for the downstream table
      let rows = impactedData.map(
        ([
          guid,
          displayText,
          connectorName,
          typeName,
          description,
          certificateStatus,
          owners,
          meanings,
          classifications,
          sourceUrl,
        ]) => {
          // Getting connector and certification images
          const connectorImage = get_image_url_getConnectorImage(connectorName);
          const certificationImage = certificateStatus
            ? get_image_url_getCertificationImage(certificateStatus)
            : "";

          return [
            `${connectorImage} [${displayText}](${get_environment_variables_ATLAN_INSTANCE_URL}/assets/${guid}/overview?utm_source=dbt_gitlab_action) ${certificationImage}`,
            `\`${typeName}\``,
            description,
            owners,
            meanings,
            classifications,
            sourceUrl ? `[Open in ${connectorName}](${sourceUrl})` : " ",
          ];
        }
      );

      const environmentName =
        materialisedAsset?.attributes?.assetDbtEnvironmentName;
      const projectName = materialisedAsset?.attributes?.assetDbtProjectName;
      // Generating asset information
      const assetInfo = gitlab_integration_getAssetInfo(
        get_environment_variables_ATLAN_INSTANCE_URL,
        asset,
        materialisedAsset,
        environmentName,
        projectName
      );

      // Generating the downstream table
      const downstreamTable = gitlab_integration_getDownstreamTable(
        get_environment_variables_ATLAN_INSTANCE_URL,
        downstreamAssets,
        rows,
        materialisedAsset
      );

      // Generating the "View asset in Atlan" button
      const viewAssetButton = gitlab_integration_getViewAssetButton(get_environment_variables_ATLAN_INSTANCE_URL, asset);

      // Generating the final comment based on the presence of downstream assets
      if (downstreamAssets.entities.length > 0) {
        return `${assetInfo}

${downstreamTable}

${viewAssetButton}`;
      } else {
        return `${assetInfo}

No downstream assets found.

${viewAssetButton}`;
      }
    } catch (error) {
      logger_logger.withError(
        `Error rendering Downstream Assets: ${error.message}`,
        gitlab_integration_integrationName,
        CI_COMMIT_SHA,
        "renderDownstreamAssetsComment"
      );
      throw error;
    }
  }
}

;// CONCATENATED MODULE: ./adapters/gateway.js
// Common Gateway for all integrations

async function runAction(token, integrationModule) {
  if (token === undefined) {
    logger_logger.logInfo("Token not provided.", "runAction");
    return;
  }
  const integration = new integrationModule(token);
  await integration.run();
}

;// CONCATENATED MODULE: ./adapters/index.js





// main.js


async function run() {
  //Add new integrations over here
  await runAction(GITHUB_TOKEN, ContractIntegration);
  await runAction(GITHUB_TOKEN, GitHubIntegration);
  await runAction(GITLAB_TOKEN, GitLabIntegration);
}

run();

})();

