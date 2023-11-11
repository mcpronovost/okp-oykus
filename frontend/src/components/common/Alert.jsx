import { getTranslation, getLang } from "@/plugins/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const OkpAlert = (props) => {
  const lang = getLang(window.location);
  const t = getTranslation(lang);

  const type = props.type || "error";
  const title = props.title || t("An error occurred");
  const message = props.message;
  const icon = props.icon || (
    type == "error" ? faExclamationCircle :
    type == "warning" ? faExclamationTriangle :
    type == "success" ? faCheckCircle :
    type == "info" ? faInfoCircle :
    faExclamationCircle
  );

  return (
    <>
      <div className={`okp-alert okp-alert--${type} okp-core`}>
        <div className="okp-alert-wrapper">
          {title && (
            <header className="okp-alert-header">
              <FontAwesomeIcon icon={icon} className="okp-alert-header-icon" />
              <p className="okp-alert-header-title">{title}</p>
            </header>
          )}
          {message && (
            <section className="okp-alert-body">
              <p className="okp-alert-body-message">{message}</p>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default OkpAlert;
