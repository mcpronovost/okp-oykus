import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CommonUserBanner = ({ avatar, banner }) => {
  return (
    <div className="okp-userbanner">
      <div className="okp-banner">
        <div className="okp-banner-img" style={{ backgroundImage: banner ? `url('${banner}')` : "none"}}></div>
      </div>
      <div className="okp-avatar">
        {avatar ? (
            <img src={avatar} alt="Avatar" />
          ) : (
            <div className="okp-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
      </div>
    </div>
  );
};

export default CommonUserBanner;
