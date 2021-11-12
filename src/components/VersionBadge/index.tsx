import './index.css';
import buildInfo from '../../build-info.json';

const VersionBadge: React.FC = () => {
  console.log(buildInfo);
  if (buildInfo.buildEnv.toLowerCase() === 'production') {
    return <></>;
  }
  return (
    <div className="version-badge">
      <div className="top">
        <div className="env">{buildInfo.buildEnv.toUpperCase()}</div>
        <div className="version">V{buildInfo.version}</div>
      </div>
      <div className="build-time">{new Date(buildInfo.buildTime).toLocaleString()}</div>
    </div>
  );
};

export default VersionBadge;
