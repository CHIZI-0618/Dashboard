import * as React from 'react';
import { GitHub } from 'react-feather';
import { useQuery } from 'react-query';
import { fetchVersion } from 'src/api/version';
import ContentHeader from 'src/components/ContentHeader';
import { connect } from 'src/components/StateProvider';
import { getClashAPIConfig } from 'src/store/app';
import { ClashAPIConfig } from 'src/types';

import s from './About.module.scss';

type Props = { apiConfig: ClashAPIConfig };

function Version({
  name,
  link,
  version,
}: {
  name: string;
  link: string;
  version: string;
}) {
  return (
    <div className={s.root}>
      <h2>{name}</h2>
      <p>
        <span>Version </span>
        <span className={s.mono}>{version}</span>
      </p>
      <p>
        <a
          className={s.link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub size={20} />
          <span>Source</span>
        </a>
      </p>
    </div>
  );
}

function AboutImpl(props: Props) {
  const { data: version } = useQuery(['/version', props.apiConfig], () =>
    fetchVersion('/version', props.apiConfig)
  );
  return (
    <>
      <ContentHeader title="About" />
        {__MINI__ ? (
        <Version
            name="Clash.Mini"
            version="0.1.5"
            link="https://github.com/Clash-Mini/Clash.Mini"
      />): null
        }
        {version.Meta ? (
        <Version
          name="Clash Kernel"
          version={version.version+" - Meta"}
          link="https://github.com/Clash-Mini/clash.Meta"
        />
      ) :  <Version
            name="Clash.Kernel"
            version={version.version}
            link="https://github.com/Clash-Mini/clash.Meta"
        />}
      <Version
        name="Dashboard"
        version={__VERSION__}
        link="https://github.com/Clash-Mini/Dashboard"
      />
    </>
  );
}

const mapState = (s) => ({
  apiConfig: getClashAPIConfig(s),
});

export const About = connect(mapState)(AboutImpl);
