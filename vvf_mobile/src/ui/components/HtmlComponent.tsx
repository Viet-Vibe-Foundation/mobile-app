import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {useAppColor} from 'src/hooks/useAppColor';
import {htmlContent, normalizeHTML} from 'src/utils/htmlUtil';

interface Props {
  html: string | null;
}

const HtmlComponent = ({html}: Props) => {
  const [height, setHeight] = useState<number>(300);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useAppColor();

  if (!html) {
    return null;
  }

  const rawContent = htmlContent(html, theme.onPrimary);
  const normalizedContent = normalizeHTML(rawContent);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator style={styles.loading} size="large" />}

      <AutoHeightWebView
        source={{html: normalizedContent}}
        viewportContent={'width=device-width, initial-scale=1, maximum-scale=1'}
        scrollEnabled={false}
        onSizeUpdated={size => {
          if (size.height !== height) {
            setHeight(size.height);
          }
        }}
        onLoadEnd={() => setLoading(false)}
        style={[styles.webView, {height}]}
        setSupportMultipleWindows={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  webView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  loading: {
    position: 'absolute',
    top: 16,
    left: '50%',
    marginLeft: -10,
  },
});

export default HtmlComponent;
