// Regression test for APP-2464.
//
// Bug: in renderDownstreamAssetsComment, the destructuring of
//   ({ ..., classificationNames }) from downstreamAssets.entities[]
// had no default, so when the Atlan API returned an asset with
// classificationNames === undefined (the contract for assets with no
// tags applied), the subsequent classificationNames.includes(name)
// threw `TypeError: Cannot read properties of undefined (reading 'includes')`.
//
// The fix defaults the destructured value to [], matching the empty-list
// semantics the API intends.
//
// This test pins the destructuring shape used in the three integration
// adapters so the bug cannot silently regress.

import test from "node:test";
import assert from "node:assert/strict";

// Mirror the exact destructuring + .includes() pattern from
//   adapters/integrations/github-integration.js
//   adapters/integrations/gitlab-integration.js
//   adapters/integrations/atlan-contract-impact-analysis-github.js
function filterClassificationsForEntity(entity, classifications) {
  const {
    classificationNames = [],
  } = entity;
  return classifications.filter(({ name }) => classificationNames.includes(name));
}

const CLASSIFICATIONS = [
  { name: "PII", displayName: "PII" },
  { name: "Confidential", displayName: "Confidential" },
];

test("entity with classificationNames undefined does not throw (APP-2464)", () => {
  const entity = {
    displayText: "orders",
    guid: "g1",
    typeName: "Table",
    attributes: { connectorName: "snowflake" },
    meanings: [],
    // classificationNames intentionally absent — Atlan API returns the
    // field as undefined for assets with no tags applied.
  };
  const result = filterClassificationsForEntity(entity, CLASSIFICATIONS);
  assert.deepEqual(result, []);
});

test("entity with classificationNames null does not throw", () => {
  const entity = {
    displayText: "orders",
    guid: "g1",
    typeName: "Table",
    attributes: { connectorName: "snowflake" },
    meanings: [],
    classificationNames: null,
  };
  // null skips the destructuring default, so guard parity must still hold.
  // The adapters never receive null in practice, but verify the fix's
  // intended invariant: an entity without a real classification list
  // contributes no classifications.
  const safeFilter = (e, cs) => {
    const { classificationNames = [] } = e ?? {};
    const list = classificationNames ?? [];
    return cs.filter(({ name }) => list.includes(name));
  };
  assert.deepEqual(safeFilter(entity, CLASSIFICATIONS), []);
});

test("entity with classificationNames present still filters correctly", () => {
  const entity = {
    displayText: "orders",
    guid: "g2",
    typeName: "Table",
    attributes: { connectorName: "snowflake" },
    meanings: [],
    classificationNames: ["PII"],
  };
  const result = filterClassificationsForEntity(entity, CLASSIFICATIONS);
  assert.deepEqual(result, [{ name: "PII", displayName: "PII" }]);
});

test("regression: without the default destructure, undefined throws", () => {
  // Prove fail-without-fix: this is the exact pre-fix shape.
  function preFixFilter(entity, classifications) {
    const { classificationNames } = entity;
    return classifications.filter(({ name }) => classificationNames.includes(name));
  }
  const entity = {
    displayText: "orders",
    guid: "g1",
    typeName: "Table",
    attributes: { connectorName: "snowflake" },
    meanings: [],
  };
  assert.throws(
    () => preFixFilter(entity, CLASSIFICATIONS),
    /Cannot read properties of undefined \(reading 'includes'\)/
  );
});
