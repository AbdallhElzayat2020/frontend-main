import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
  buttons?: React.ReactNode;
  parent?: {
    title: string;
    link: string;
  }[];
}

const Breadcrumb = ({ pageName, buttons, parent }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-stroke pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-strokedark">
      <h2 className="text-lg  font-medium text-black dark:text-white">
        {pageName}
      </h2>

      {buttons || (
        <nav>
          <ol className="flex items-center gap-2">
            <li className="text-primary">{pageName}</li>
            {parent &&
              parent.map((item, index) => (
                <li key={index}>
                  <Link to={item.link}> / {item.title} / </Link>
                </li>
              ))}
            <li>
              <Link to="/">{parent ? "" : " / "}Dashboard</Link>
            </li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
