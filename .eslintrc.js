module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "standard",
        "standard-react"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react",
        "promise"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "react/jsx-indent": [2, 4],
        "semi": 0,
        "react/no-unused-prop-types": 0
    }
};