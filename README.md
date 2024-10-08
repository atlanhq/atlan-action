# Atlan Action

![atlan-action](https://github.com/user-attachments/assets/df739f4b-15da-4681-a591-4a7101e87b1f)

## Overview

_Have you ever changed a dbt model or a [data contract](https://ask.atlan.com/hc/en-us/articles/9281528742799-How-to-create-data-contracts) only to later find it broke a downstream table or dashboard? 💔_

We've created a GitHub Action to help you out — putting Atlan's impact analysis right into your pull request. So now, before merging the PR, you can see the potential downstream impact of your changes.

Here's what it looks like 👇

![GitHub Action comment screenshot](https://github.com/user-attachments/assets/75db2cb9-f62b-4696-9918-e70b7360b022)

## Prerequisites

- **Atlan API token** → before you can run the action, you need an [Atlan API token](https://ask.atlan.com/hc/en-us/articles/8312649180049).

## Configure the action

1. Create [repository secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) in your repository:

   - `ATLAN_INSTANCE_URL` with the URL of your Atlan instance.
   - `ATLAN_API_TOKEN` with the value of the API token.

   ![Actions Secrets Screenshot](https://github.com/user-attachments/assets/8eb94830-08f0-4ad5-9186-813c6a00e8e3)

2. Add the GitHub Action to your workflow:

   1. Create a workflow file in your repository: `.github/workflows/atlan-impact-analysis.yml`
   2. Add the following code to the workflow file:

      ```yaml
      name: Atlan action

      on:
        pull_request:
          types: [opened, edited, synchronize, reopened, closed]

      jobs:
        get-downstream-impact:
          name: Get Downstream Assets
          runs-on: ubuntu-latest
          steps:
            - name: Checkout
              uses: actions/checkout@v4

            - name: Run Action
              uses: atlanhq/atlan-action@v1
              with:
                GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
                ATLAN_INSTANCE_URL: ${{secrets.ATLAN_INSTANCE_URL}}
                ATLAN_API_TOKEN: ${{secrets.ATLAN_API_TOKEN}}
                # Add ATLAN_CONFIG to run impact analysis on contracts
                ATLAN_CONFIG: .atlan/config.yaml
      ```

## Running the Action

After you've completed the configuration above, create a pull request with a changed dbt model or data contract file to run the action. You should see the Atlan action running and then adding comments in your pull request:

- The action will add and update a single comment for every file change.
- The impacted assets in the comment will be displayed in a collapsible section and grouped by source and asset type.
- The comment will include some metadata for your impacted assets — such as descriptions, owners, and linked glossary terms.
- View the impacted assets in Atlan or open the source URL — for example, view an impacted Looker dashboard directly in Looker.

## Inputs

| Name                          | Description                                                                                                                                                                                                                                                                                                                     | Required | Default |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `GITHUB_TOKEN`                | Needed to write comments on PRs to print all the downstream assets. https://dev.to/github/the-githubtoken-in-github-actions-how-it-works-change-permissions-customizations-3cgp                                                                                                                                                 | true     |
| `ATLAN_INSTANCE_URL`          | Needed for making API requests to the user's tenant.                                                                                                                                                                                                                                                                            | true     |
| `ATLAN_API_TOKEN`             | Needed for authenticating API requests to the user's tenant. https://ask.atlan.com/hc/en-us/articles/8312649180049                                                                                                                                                                                                              | true     |
| `DBT_ENVIRONMENT_BRANCH_MAP`  | Map Github branch with specific dbt environment, if you do this - Atlan Github action will pick lineage for that specific environment from Atlan.You can provide the mapping like `branch name`: `dbt environment name`. <br><br>main: DBT-DEMO-PROD<br>beta: Wide World Importers PE1<br>test-action: Wide World Importers PE1 | false    |
| `IGNORE_MODEL_ALIAS_MATCHING` | By default the action checks if there's an alias defined for a model in the code and looks for the relevant asset in Atlan using that alias. You can turn off matching alias name using this variable.                                                                                                                          | false    | false   |
| `ATLAN_CONFIG` | The Atlan CLI configuration file is typically located at `.atlan/config.yaml`. Setting the `ATLAN_CONFIG` environment variable will trigger impact analysis on Atlan Data Contracts, if included in a GitHub pull request.                                                                                                                          | false    |    |

## FAQs

### Action does not get the model from the correct environment?

In case there are multiple dbt models in your Atlan instance with the same name but in different environments, the action may get the wrong model. To fix this, you can map Github branch with specific dbt environment, if you do this - Atlan Github action will pick lineage for that specific environment from Atlan.
You can provide the mapping like `branch name`: `dbt nvironment name`

```diff
jobs:
  get-downstream-impact:
    name: Get Downstream Assets
    runs-on: ubuntu-latest
    steps:
      - name: Run Action
        uses: atlanhq/atlan-action@v1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          ATLAN_INSTANCE_URL: ${{secrets.ATLAN_INSTANCE_URL}}
          ATLAN_API_TOKEN: ${{secrets.ATLAN_API_TOKEN}}
+         DBT_ENVIRONMENT_BRANCH_MAP: |
+           main: dbt-prod
+           beta: dbt-test
```

### Action gets model by alias and not by model name?

By default the action checks if there's an alias defined for a model in the code and looks for the relevant asset in Atlan using that alias. You can turn off matching alias name using this input `IGNORE_MODEL_ALIAS_MATCHING` input to true. For example:

```diff
jobs:
  get-downstream-impact:
    name: Get Downstream Assets
    runs-on: ubuntu-latest
    steps:
      - name: Run Action
        uses: atlanhq/atlan-action@v1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          ATLAN_INSTANCE_URL: ${{secrets.ATLAN_INSTANCE_URL}}
          ATLAN_API_TOKEN: ${{secrets.ATLAN_API_TOKEN}}
+         IGNORE_MODEL_ALIAS_MATCHING: true
```
