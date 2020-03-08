## TS+webpack 脚手架

> H5 开发，
> GodGC 统一整理

- `cd folder`

- `npm i`

- `npm start`

- `npm run publish`

- [最新]package.json 按需加载某个框架：
  config => common =>

  ```javascript
  {
    loader: 'ui-component-loader',
    options: {
      'lib': 'antd-mobile',
      'camel2': '-',
      'style': 'style/index.css',
    }
  }
  ```

- package.json 按需加载某个框架 css：
  config => common => 

  ```javascript
  rules: [
    {
      test: /\.ts[x]?$/,
      enforce: "pre",
      use: [
        {
          loader: "babel-loader",
        },
        {
          loader: "awesome-typescript-loader"
        }
      ]
    },
  ]
  ```


  babel => plugins =>

  ```javascript
  [
    "import",
    {
      "libraryName": name,
      "style": "css"
    },
    name
  ],
  ```
