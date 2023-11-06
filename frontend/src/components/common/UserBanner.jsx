const CommonUserBanner = ({ avatar, banner }) => {
  return (
    <div className="okp-userbanner">
      <div className="okp-banner">
        <div className="okp-banner-img" style={{ backgroundImage: banner ? `url('${banner}')` : "none"}}></div>
      </div>
      <div className="okp-avatar">
        <img src={avatar} alt="Avatar" />
      </div>
    </div>
  );
};

export default CommonUserBanner;
