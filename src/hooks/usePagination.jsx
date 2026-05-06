import { useMemo, useState } from "react"

export const usePagination = ({ perPage = 6, list = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(list.length / perPage));
    }, [list, perPage]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;

        return list.slice(start, end);
    }, [list, currentPage, perPage]);

    const changePage = (page) => {
        const safePage = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(safePage);
    };

    return {
        currentPage,
        totalPages,
        data: paginatedData,
        changePage,
    };
};