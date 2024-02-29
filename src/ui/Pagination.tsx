"use client";
import LinkButton from "@/components/LinkButton";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ total }: { total: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = Number(searchParams.get("page")) || 1;
  const currentPage = current > 0 ? current : 1;
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber) {
      params.set("page", pageNumber.toString());
    }
    return `${pathname}?${params.toString()}`;
  };
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= total;
  const isSecondFromLast = currentPage === total - 1;
  const isTherdFromLast =
    currentPage + 2 === total || currentPage + 1 === total;

  const navigation = isFirstPage
    ? [currentPage, currentPage + 1, currentPage + 2]
    : isLastPage || isSecondFromLast
      ? [currentPage - 2, currentPage - 1, currentPage]
      : [currentPage - 1, currentPage, currentPage + 1];
  return (
    <>
      {total !== 1 && (
        <nav
          aria-label="Page navigation"
          className="flex justify-center m-5 p-3"
        >
          {currentPage <= total ? (
            <ul className="inline-flex -space-x-px text-sm">
              {!isFirstPage && (
                <>
                  <li>
                    <LinkButton href={`${pathname}?page=${currentPage - 1}`}>
                      Previos
                    </LinkButton>
                  </li>
                  {currentPage !== 2 && (
                    <>
                      <li>
                        <LinkButton href={`${pathname}?page=1`}>1</LinkButton>
                      </li>
                      <li>
                        <LinkButton
                          href="#"
                          styles="select-none pointer-events-none"
                        >
                          ...
                        </LinkButton>
                      </li>
                    </>
                  )}
                </>
              )}
              {navigation.map((item) => (
                <li key={item}>
                  <LinkButton
                    isActive={item === currentPage}
                    href={createPageUrl(item)}
                  >
                    {item}
                  </LinkButton>
                </li>
              ))}
              {!isTherdFromLast && !isLastPage && (
                <li>
                  <LinkButton href="#" styles="select-none pointer-events-none">
                    ...
                  </LinkButton>
                </li>
              )}
              {currentPage !== total && (
                <li>
                  <LinkButton href={createPageUrl(total)}>{total}</LinkButton>
                </li>
              )}
              {!isLastPage && (
                <li>
                  <LinkButton href={`${pathname}?page=${currentPage + 1}`}>
                    Next
                  </LinkButton>
                </li>
              )}
            </ul>
          ) : (
            <div className="flex flex-col gap-5">
              <LinkButton href="/?page=1">
                Вернуться к первой странице
              </LinkButton>
              <LinkButton href="/?page=1">
                Вернуться к последней старнице
              </LinkButton>
            </div>
          )}
        </nav>
      )}
    </>
  );
};
export default Pagination;
