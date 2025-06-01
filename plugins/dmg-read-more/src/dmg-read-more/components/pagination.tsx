import { Button } from '@wordpress/components';
import { useCallback } from '@wordpress/element';

type PaginationProps = {
	totalPages: number;
	handlePaginationClick: ( pageNumber: number ) => void;
	currentPage: number;
};

function getPagination( currentPage: number, total: number ) {
	const delta = 1; // Number of pages to show around the current page.
	const range = [];
	const rangeWithDots = [];
	let lastPageInRange: number;

	// Always show first and last page, and pages around the current page.
	for ( let i = 1; i <= total; i++ ) {
		if (
			i === 1 ||
			i === total ||
			( i >= currentPage - delta && i <= currentPage + delta )
		) {
			range.push( i );
		}
	}

	// Insert ellipsis where page numbers are skipped.
	for ( let i of range ) {
		if ( lastPageInRange ) {
			if ( i - lastPageInRange === 2 ) {
				// Only one page missing at end of range, so add one.
				rangeWithDots.push( lastPageInRange + 1 );
			} else if ( i - lastPageInRange > 2 ) {
				// More than one missing, so add an ellipsis.
				rangeWithDots.push( '...' );
			}
		}
		rangeWithDots.push( i );
		lastPageInRange = i;
	}

	return rangeWithDots;
}

export default function Pagination( {
	totalPages = 0,
	handlePaginationClick,
	currentPage = 1,
}: PaginationProps ) {
	if ( totalPages <= 1 ) {
		return null;
	}

	const pages = getPagination( currentPage, totalPages );

	const createHandlePaginationClick = useCallback(
		( page: number ) => () => handlePaginationClick( page ),
		[ handlePaginationClick ]
	);

	return (
		<ul className="read-more__pagination">
			{
				pages.map( ( page, index ) => {
					return page === '...' ? (
						<li key={ 'dots-' + index }>…</li>
					) : (
						<li key={ page }>
							<Button
								size="small"
								variant={ page === currentPage ? 'primary' : 'secondary' }
								onClick={ createHandlePaginationClick( page ) }
							>
								{ page }
							</Button>
						</li>
					);
				} )
			}
		</ul>
	);
}
