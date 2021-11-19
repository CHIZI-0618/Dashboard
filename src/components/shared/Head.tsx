import * as React from 'react';
import { connect } from 'src/components/StateProvider';
import { getClashAPIConfig, getClashAPIConfigs } from 'src/store/app';

const mapState = (s) => ({
  apiConfig: getClashAPIConfig(s),
  apiConfigs: getClashAPIConfigs(s),
});

function HeadImpl({
  //apiConfig,
  apiConfigs,
}: {
  apiConfig: { baseURL: string };
  apiConfigs: any[];
}) {
  React.useEffect(() => {
    let title = 'Dashboard';
    if (apiConfigs.length > 1) {
      // try {
        //const host = new URL(apiConfig.baseURL).host;
        title = `Clash.Mini - Dashboard`;
      // } catch (e) {
      //   // ignore
      // }
    }
    document.title = title;
  });

  return <></>;
}

export const Head = connect(mapState)(HeadImpl);
