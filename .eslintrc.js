module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "plugins": ["@typescript-eslint", "import"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
      },
    "ignorePatterns": ["test/"],
    "overrides": [
        {
            "files": ['src/**/.ts']
        }
    ],
    
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "rules": {
      "@typescript-eslint/no-explicit-any": "off",
    }
}
