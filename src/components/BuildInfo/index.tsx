import buildInfo from '../../build-info.json';
import { Wrapper, Top, Env, Version, BuildTime } from './style';

const BuildInfo: React.FC = () => {
  Object.assign(document.documentElement.dataset, buildInfo);
  if (buildInfo.buildEnv.toLowerCase() === 'production') {
    return <></>;
  }
  return (
    <Wrapper>
      <Top>
        <Env>{buildInfo.buildEnv.toUpperCase()}</Env>
        <Version>V{buildInfo.version}</Version>
      </Top>
      <BuildTime>{new Date(buildInfo.buildTime).toLocaleString()}</BuildTime>
    </Wrapper>
  );
};

export default BuildInfo;
