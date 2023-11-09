const CommonHeader = ({ title, subtitle }) => {
  return (
    <header className="okp-common-header">
      <h1>{title}</h1>
      {subtitle ?? (
        <p>{subtitle}</p>
      )}
      <hr />
    </header>
  );
};

export default CommonHeader;
