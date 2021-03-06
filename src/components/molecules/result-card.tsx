import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';

import {Button} from 'components/atoms/button';
import {Markdown} from 'components/atoms/markdown';
import {Spacing} from 'components/atoms/spacing';
import {text, colors} from 'theme';
import {useSettings} from 'providers/settings';

const urlsMap = {
  noSymptomsWell: 'https://www2.hse.ie/app/in-app-good',
  noSymptomsNotWell: 'https://www2.hse.ie/app/in-app-good',
  riskGroupCocooning: 'https://www2.hse.ie/app/in-app-at-risk-cocooning',
  riskGroup: 'https://www2.hse.ie/app/in-app-at-risk',
  recovered: 'https://www2.hse.ie/app/in-app-at-risk-recovered',
  virusIsolation: 'https://www2.hse.ie/app/in-app-symptoms'
};

type Result =
  | 'noSymptomsWell'
  | 'noSymptomsNotWell'
  | 'riskGroup'
  | 'recovered'
  | 'virusIsolation';

const Result: React.FC<{result: Result}> = ({result}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {checkerThankYouText} = useSettings();

  const link = (url: string) => {
    WebBrowser.openBrowserAsync(url, {
      enableBarCollapsing: true,
      showInRecents: true
    });
  };

  if (result === 'noSymptomsWell' || result === 'noSymptomsNotWell') {
    return (
      <View style={styles.card}>
        <Markdown style={{}}>{checkerThankYouText[result]}</Markdown>
        <Spacing s={12} />
        <Button
          width="100%"
          type="empty"
          onPress={() => navigation.navigate('symptoms.history')}>
          {t(`checker:${result}:viewHistory`)}
        </Button>

        <Spacing s={16} />

        <Text style={text.default}>{t(`checker:${result}:advice`)}</Text>
        <Spacing s={12} />
        <Button width="100%" type="empty" onPress={() => link(urlsMap[result])}>
          {t(`checker:${result}:protectionAdvice`)}
        </Button>
      </View>
    );
  } else if (result === 'riskGroup') {
    return (
      <View style={styles.card}>
        <Markdown style={{}}>{checkerThankYouText[result]}</Markdown>
        <Button
          width="100%"
          type="empty"
          onPress={() => link(urlsMap.riskGroupCocooning)}>
          {t('checker:riskGroup:warningReadMore')}
        </Button>

        <Spacing s={16} />

        <Text style={text.default}>{t('checker:riskGroup:advice')}</Text>
        <Spacing s={12} />
        <Button
          width="100%"
          type="empty"
          onPress={() => link(urlsMap.riskGroup)}>
          {t('checker:riskGroup:adviceReadMore')}
        </Button>
        <Spacing s={12} />
        <Button
          width="100%"
          type="empty"
          onPress={() => navigation.navigate('symptoms.history')}>
          {t('checker:viewHistory')}
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Markdown style={{}}>{checkerThankYouText[result]}</Markdown>

      <Spacing s={16} />

      <Button width="100%" type="empty" onPress={() => link(urlsMap[result])}>
        {t('checker:linkButton')}
      </Button>
      <Spacing s={12} />
      <Button
        width="100%"
        type="empty"
        onPress={() => navigation.navigate('symptoms.history')}>
        {t('checker:viewHistory')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-start'
  }
});

export {Result};
