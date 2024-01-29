const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.ts', // Specify the entry point
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/docx',
          to: 'dist/docx',
          globOptions: {
            ignore: ['*.ts'],
          },
        },
      ],
    }),
  ],
};
