import { Image, PenLine } from "lucide-react";

const ProfilePlayerCard = ({ user }) => {

  return (
    <section className="okp-settings-profile-content-profilecard">
      <div className="okp-settings-profile-content-profilecard-preview">
        {!!user && (
          <>
            <figure className="okp-banner">
              {(user.avatar) && <img src={user.avatar} alt="" className="okp-banner-img" />}
            </figure>
            <figure className="okp-avatar">
              {(user.avatar) ? (
                <img src={user.avatar} alt="" className="okp-avatar-img" />
              ) : (
                <span className="okp-avatar-abbr">
                  {user.abbr}
                </span>
              )}
            </figure>
            <div className="okp-playername">
              <span>{user.playername}</span>
            </div>
          </>
        )}
      </div>
      <div className="okp-settings-profile-content-profilecard-playername okp-animate-boxup">
        <PenLine className="okp-icon" />
        <span>Change playername</span>
        <small>120 characters maximum</small>
      </div>
      <div className="okp-settings-profile-content-profilecard-avatar okp-animate-boxup">
        <Image className="okp-icon" />
        <span>Change avatar</span>
        <small>200x200px size recommended</small>
      </div>
    </section>
  );
}

export default ProfilePlayerCard;