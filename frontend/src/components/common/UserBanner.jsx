import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CommonUserBanner = ({ height, avatar, banner, avatarSize, bannerSize, radiusTop, centeredBanner }) => {
  return (
    <div className="okp-userbanner" style={{
      height: `${height || avatarSize+bannerSize}px`
    }}>
      <div className="okp-banner" style={{
        borderTopLeftRadius: radiusTop || "0",
        borderTopRightRadius: radiusTop || "0",
        height: `${bannerSize}px`
      }}>
        <div className="okp-banner-img" style={{
          backgroundImage: banner ? `url('${banner}')` : "none"
        }}></div>
      </div>
      <div className="okp-avatar" style={{
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
        top: `${centeredBanner ? ((bannerSize/2)-(avatarSize/2)) : bannerSize/2}px`
      }}>
        {avatar ? (
            <img src={avatar} alt="Avatar" />
          ) : (
            <div className="okp-icon" style={{
              fontSize: `${avatarSize/2}px`,
              lineHeight: `${avatarSize}px`
            }}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
      </div>
    </div>
  );
};

export default CommonUserBanner;
