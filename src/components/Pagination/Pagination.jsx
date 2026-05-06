import React from "react";
import "./Pagination.scss";

const DOTS = "...";

const getPaginationRange = (current, total) => {
    const delta = 1; // сколько страниц показывать вокруг текущей

    const range = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) {
        range.push(DOTS);
    }

    for (let i = left; i <= right; i++) {
        range.push(i);
    }

    if (right < total - 1) {
        range.push(DOTS);
    }

    if (total > 1) {
        range.push(total);
    }

    return range;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = getPaginationRange(currentPage, totalPages);

    return (
        <div className="pagination">
            <button
                className="pagination__btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {pages.map((page, idx) =>
                page === DOTS ? (
                    <span key={`dots-${idx}`} className="pagination__dots">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`pagination__btn ${
                            page === currentPage ? "active" : ""
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className="pagination__btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};