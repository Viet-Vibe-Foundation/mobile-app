import React from 'react';
import {WebView} from 'react-native-webview';

interface Props {
  html: string | null;
}

const HtmlComponent = ({html}: Props) => {
  if (!html) return null;

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 10px; font-size: 16px; }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  return (
    <WebView
      source={{html: htmlContent}}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      textZoom={100}
      originWhitelist={['*']}
      style={{flex: 1, height: 300, backgroundColor: 'transparent'}}
    />
  );
};

export default HtmlComponent;
