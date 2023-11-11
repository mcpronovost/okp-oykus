import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const OkpLoading = () => {
  return (
    <div className="okp-loading">
        <div className="okp-loading-wrapper fa-fade">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse" />
        </div>
    </div>
  );
};

export default OkpLoading;
