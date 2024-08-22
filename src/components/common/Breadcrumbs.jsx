import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const breadcrumbNames = {
    dashboard: "Dashboard V2",
    settings: "Settings",
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbName = breadcrumbNames[name] || name;

        return isLast ? (
          <span key={breadcrumbPath} className="font-bold">
            {">"} {breadcrumbName}
          </span>
        ) : (
          <span key={breadcrumbPath}>
            <Link to={breadcrumbPath}>{breadcrumbName}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
