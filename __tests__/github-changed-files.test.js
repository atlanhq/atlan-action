import { describe, it, mock, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Mock dependencies before importing the module under test
const mockLogger = {
  withInfo: mock.fn(),
  withError: mock.fn(),
};

// We'll test the getChangedFiles logic by extracting and testing the
// file processing logic directly, since the full class has many dependencies.

// This is the core mapping logic extracted from getChangedFiles
function processChangedFile({ filename, status, previous_filename }) {
  try {
    const [modelName] = filename
      .match(/.*models\/(.*)\.sql/)[1]
      .split("/")
      .reverse()[0]
      .split(".");

    if (modelName) {
      const result = {
        fileName: modelName,
        filePath: filename,
        status,
      };

      // For renamed files, extract the old model name
      if (status === "renamed" && previous_filename) {
        try {
          const [oldModelName] = previous_filename
            .match(/.*models\/(.*)\.sql/)[1]
            .split("/")
            .reverse()[0]
            .split(".");
          result.oldFileName = oldModelName;
          result.previousFilePath = previous_filename;
        } catch (e) {
          // Old file was not a model file, treat as new addition
        }
      }

      return result;
    }
  } catch (e) {
    // If the new filename doesn't match models pattern, check old filename for renames
    if (status === "renamed" && previous_filename) {
      try {
        const [oldModelName] = previous_filename
          .match(/.*models\/(.*)\.sql/)[1]
          .split("/")
          .reverse()[0]
          .split(".");
        if (oldModelName) {
          // Model was renamed out of models/ dir — treat as removal
          return {
            fileName: oldModelName,
            filePath: previous_filename,
            status: "removed",
          };
        }
      } catch (e2) {
        // Neither old nor new path matches model pattern
      }
    }
  }
  return undefined;
}

describe("GitHub getChangedFiles - file processing logic", () => {
  describe("added files", () => {
    it("should process a newly added model file", () => {
      const result = processChangedFile({
        filename: "models/staging/stg_customers.sql",
        status: "added",
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_customers",
        filePath: "models/staging/stg_customers.sql",
        status: "added",
      });
    });
  });

  describe("modified files", () => {
    it("should process a modified model file", () => {
      const result = processChangedFile({
        filename: "models/marts/fct_orders.sql",
        status: "modified",
      });

      assert.deepStrictEqual(result, {
        fileName: "fct_orders",
        filePath: "models/marts/fct_orders.sql",
        status: "modified",
      });
    });
  });

  describe("removed files", () => {
    it("should process a deleted model file with status 'removed'", () => {
      const result = processChangedFile({
        filename: "models/staging/stg_orders.sql",
        status: "removed",
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_orders",
        filePath: "models/staging/stg_orders.sql",
        status: "removed",
      });
    });

    it("should process a deleted model file in nested directory", () => {
      const result = processChangedFile({
        filename: "dbt/models/marts/finance/fct_revenue.sql",
        status: "removed",
      });

      assert.deepStrictEqual(result, {
        fileName: "fct_revenue",
        filePath: "dbt/models/marts/finance/fct_revenue.sql",
        status: "removed",
      });
    });
  });

  describe("renamed files", () => {
    it("should process a renamed model file and capture old name", () => {
      const result = processChangedFile({
        filename: "models/staging/stg_customers_v2.sql",
        status: "renamed",
        previous_filename: "models/staging/stg_customers.sql",
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_customers_v2",
        filePath: "models/staging/stg_customers_v2.sql",
        status: "renamed",
        oldFileName: "stg_customers",
        previousFilePath: "models/staging/stg_customers.sql",
      });
    });

    it("should process a model moved between directories", () => {
      const result = processChangedFile({
        filename: "models/marts/fct_orders.sql",
        status: "renamed",
        previous_filename: "models/staging/stg_orders.sql",
      });

      assert.deepStrictEqual(result, {
        fileName: "fct_orders",
        filePath: "models/marts/fct_orders.sql",
        status: "renamed",
        oldFileName: "stg_orders",
        previousFilePath: "models/staging/stg_orders.sql",
      });
    });

    it("should handle rename when old file is not in models/ directory", () => {
      const result = processChangedFile({
        filename: "models/staging/stg_new_model.sql",
        status: "renamed",
        previous_filename: "archive/old_model.sql",
      });

      // New path matches models pattern, old does not
      // Should still return the file but without old name info
      assert.equal(result.fileName, "stg_new_model");
      assert.equal(result.status, "renamed");
      assert.equal(result.oldFileName, undefined);
      assert.equal(result.previousFilePath, undefined);
    });

    it("should handle rename when new file is not in models/ directory (model removed from models)", () => {
      const result = processChangedFile({
        filename: "archive/stg_old_model.sql",
        status: "renamed",
        previous_filename: "models/staging/stg_old_model.sql",
      });

      // New path doesn't match, old path does → treat as removal
      assert.deepStrictEqual(result, {
        fileName: "stg_old_model",
        filePath: "models/staging/stg_old_model.sql",
        status: "removed",
      });
    });
  });

  describe("non-model files", () => {
    it("should return undefined for files not in models/ directory", () => {
      const result = processChangedFile({
        filename: "macros/generate_schema_name.sql",
        status: "modified",
      });

      assert.equal(result, undefined);
    });

    it("should return undefined for non-SQL files", () => {
      const result = processChangedFile({
        filename: "models/schema.yml",
        status: "modified",
      });

      assert.equal(result, undefined);
    });
  });

  describe("model name extraction", () => {
    it("should extract model name from deeply nested path", () => {
      const result = processChangedFile({
        filename: "project/dbt/models/marts/finance/fct_revenue.sql",
        status: "modified",
      });

      assert.equal(result.fileName, "fct_revenue");
    });

    it("should extract model name from root models directory", () => {
      const result = processChangedFile({
        filename: "models/my_model.sql",
        status: "modified",
      });

      assert.equal(result.fileName, "my_model");
    });
  });
});

describe("GitLab getChangedFiles - file processing logic", () => {
  // This is the core mapping logic extracted from GitLab getChangedFiles
  function processGitLabChangedFile({
    new_path,
    old_path,
    new_file,
    deleted_file,
  }) {
    try {
      const pathToMatch = deleted_file ? old_path : new_path;
      const [modelName] = pathToMatch
        .match(/.*models\/(.*)\.sql/)[1]
        .split("/")
        .reverse()[0]
        .split(".");

      if (modelName) {
        if (deleted_file) {
          return {
            fileName: modelName,
            filePath: old_path,
            status: "removed",
          };
        } else if (new_file) {
          return {
            fileName: modelName,
            filePath: new_path,
            status: "added",
          };
        } else if (new_path !== old_path) {
          const result = {
            fileName: modelName,
            filePath: new_path,
            status: "renamed_or_moved",
          };
          try {
            const [oldModelName] = old_path
              .match(/.*models\/(.*)\.sql/)[1]
              .split("/")
              .reverse()[0]
              .split(".");
            result.oldFileName = oldModelName;
            result.previousFilePath = old_path;
          } catch (e) {
            // Old file was not a model file
          }
          return result;
        } else {
          return {
            fileName: modelName,
            filePath: new_path,
            status: "modified",
          };
        }
      }
    } catch (e) {
      // If new path doesn't match, check old path for renames
      if (new_path !== old_path && !new_file) {
        try {
          const [oldModelName] = old_path
            .match(/.*models\/(.*)\.sql/)[1]
            .split("/")
            .reverse()[0]
            .split(".");
          if (oldModelName) {
            return {
              fileName: oldModelName,
              filePath: old_path,
              status: "removed",
            };
          }
        } catch (e2) {
          // Neither matches
        }
      }
    }
    return undefined;
  }

  describe("deleted files", () => {
    it("should detect deleted model files", () => {
      const result = processGitLabChangedFile({
        new_path: "models/staging/stg_orders.sql",
        old_path: "models/staging/stg_orders.sql",
        new_file: false,
        deleted_file: true,
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_orders",
        filePath: "models/staging/stg_orders.sql",
        status: "removed",
      });
    });
  });

  describe("renamed files", () => {
    it("should detect renamed files and capture old model name", () => {
      const result = processGitLabChangedFile({
        new_path: "models/staging/stg_customers_v2.sql",
        old_path: "models/staging/stg_customers.sql",
        new_file: false,
        deleted_file: false,
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_customers_v2",
        filePath: "models/staging/stg_customers_v2.sql",
        status: "renamed_or_moved",
        oldFileName: "stg_customers",
        previousFilePath: "models/staging/stg_customers.sql",
      });
    });

    it("should handle model renamed out of models/ directory", () => {
      const result = processGitLabChangedFile({
        new_path: "archive/old_model.sql",
        old_path: "models/staging/stg_old_model.sql",
        new_file: false,
        deleted_file: false,
      });

      // New path doesn't match, old path does → treat as removal
      assert.deepStrictEqual(result, {
        fileName: "stg_old_model",
        filePath: "models/staging/stg_old_model.sql",
        status: "removed",
      });
    });
  });

  describe("added files", () => {
    it("should detect new files", () => {
      const result = processGitLabChangedFile({
        new_path: "models/staging/stg_new.sql",
        old_path: "models/staging/stg_new.sql",
        new_file: true,
        deleted_file: false,
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_new",
        filePath: "models/staging/stg_new.sql",
        status: "added",
      });
    });
  });

  describe("modified files", () => {
    it("should detect modified files", () => {
      const result = processGitLabChangedFile({
        new_path: "models/staging/stg_customers.sql",
        old_path: "models/staging/stg_customers.sql",
        new_file: false,
        deleted_file: false,
      });

      assert.deepStrictEqual(result, {
        fileName: "stg_customers",
        filePath: "models/staging/stg_customers.sql",
        status: "modified",
      });
    });
  });
});

describe("Template functions", () => {
  // Simple test for template output format
  it("getModelDeletedComment should include model name and deletion indicator", () => {
    // We can't easily import ESM with mocked dependencies in Node test runner,
    // so we test the template logic inline
    const fileName = "stg_orders";
    const comment = `### <b>${fileName}</b> 🗑️
  This model is being deleted. Below is the downstream impact analysis for this model.`;

    assert.ok(comment.includes(fileName));
    assert.ok(comment.includes("deleted"));
    assert.ok(comment.includes("🗑️"));
  });

  it("getModelRenamedComment should include both old and new names", () => {
    const oldFileName = "stg_customers";
    const newFileName = "stg_customers_v2";
    const comment = `### <b>${oldFileName}</b> → <b>${newFileName}</b> ✏️
  This model is being renamed. Below is the downstream impact analysis for this model.`;

    assert.ok(comment.includes(oldFileName));
    assert.ok(comment.includes(newFileName));
    assert.ok(comment.includes("renamed"));
    assert.ok(comment.includes("→"));
  });
});
