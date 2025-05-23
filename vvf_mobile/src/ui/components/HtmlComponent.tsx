import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

interface Props {
  html: string | null;
}

const HtmlComponent = ({html}: Props) => {
  const [height, setHeight] = useState<number>(300);

  if (!html) {
    return null;
  }

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
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
    <AutoHeightWebView
      source={{html: htmlContent}}
      viewportContent={'width=device-width, initial-scale=1, maximum-scale=1'}
      scrollEnabled={false}
      onSizeUpdated={size => {
        if (size.height !== height) {
          setHeight(size.height);
        }
      }}
      style={[styles.webView, {height}]}
      setSupportMultipleWindows={false}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default HtmlComponent;
