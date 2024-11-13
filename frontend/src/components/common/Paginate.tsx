import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

interface Props {
  pages: number;
  current: string;
  around?: number;
  onChange?: (page: number) => void;
}

export default function Paginate({ pages, current, around = 2, onChange = () => {} }: Props) {
  const currentPage = parseInt(current);
  const aroundPages = parseInt(around.toString());

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pages) onChange(page);
  };

  const getPagination = () => {
    const pagesList = [];

    for (let i = 1; i <= pages; i++) {
      if (i <= (1 + aroundPages) || i >= (pages - aroundPages)) {
        // if first or last, and around
        pagesList.push(i);
      } else if (i === currentPage || (i >= (currentPage - aroundPages) && i <= (currentPage + aroundPages))) {
        // if current, and around
        pagesList.push(i);
      } else if (pagesList[pagesList.length - 1] !== "...") {
        // if last element is not ...
        pagesList.push("...");
      }
    }

    return pagesList;
  };

  const pagination = getPagination();

  return (
    <div className="okp-paginate">
      <div className="okp-paginate-previous">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
      </div>
      <div className="okp-paginate-pages">
        {pagination.map((page, index) =>
          ((page === "...") ? (
            <button
              key={index}
              className={"okp-ellipsis"}
              disabled
            >
              <Ellipsis size={16} />
            </button>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(parseInt(page as string))}
              className={currentPage === parseInt(page as string) ? "okp-active" : ""}
            >
              <span>{page}</span>
            </button>
          ))
        )}
      </div>
      <div className="okp-paginate-next">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
