module.exports = {
    root: true,
    extends: ['plugin:echobind/react-native'],
    settings: {
      "react": { "version": "16" },
      "import/resolver": {
        "node": {
          "extensions": [".js", ".ios.js", ".android.js", ".native.js", ".ts", ".tsx", ".png"]
        },
        "babel-module": {
          "alias": {}
        }
      } 
    },
    rules: {
        'jest/expect-expect': 0,
        'import/namespace': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        "react/jsx-curly-brace-presence": ['error', 'never'],
        'react/jsx-fragments': 0,
        '@typescript-eslint/no-unused-vars': 'error'
    }
};