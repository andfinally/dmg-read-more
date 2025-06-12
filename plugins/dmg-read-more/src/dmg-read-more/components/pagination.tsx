import { Button } from '@wordpress/components';

type PaginationProps = {
	totalPages: number;
	handlePaginationClick: ( pageNumber: number ) => void;
	currentPage: number;
};

/**
 * Return array of page numbers we're going to show.
 *
 * We show the first and last, and one on either side of the
 * current page.
 *
 * If there's only one page missing between a visible page and its neighbour,
 * we show that too.
 *
 * The rest we replace with an ellipsis.
 *
 * @param currentPage
 * @param total
 */
function getPagination( currentPage: number, total: number ) {
	const delta = 1; // Number of pages to show around the current page
	const result = [];
	let lastAddedPage = 0;

	for ( let i = 1; i <= total; i++ ) {
		// Determine if current page should be visible
		const isFirstOrLast = i === 1 || i === total;
		const isNearCurrent =
			i >= currentPage - delta && i <= currentPage + delta;

		if ( isFirstOrLast || isNearCurrent ) {
			// Handle gaps before adding the current page
			if ( lastAddedPage > 0 ) {
				// Gap of exactly 2 means one page is missing
				if ( i - lastAddedPage === 2 ) {
					result.push( i - 1 );
				}
				// Gap larger than 2 means we need an ellipsis
				else if ( i - lastAddedPage > 2 ) {
					result.push( '...' );
				}
			}

			// Add the current page to results
			result.push( i );
			lastAddedPage = i;
		}
	}

	return result;
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

	/**
	 * Create closure over page number, so we can attach a handler to each
	 * page button.
	 *
	 * @param page
	 */
	const createHandlePaginationClick = ( page: number ) => () =>
		handlePaginationClick( page );

	return (
		<ul className="read-more__pagination">
			{ pages.map( ( page, index ) => {
				return page === '...' ? (
					<li key={ 'dots-' + index }>…</li>
				) : (
					<li key={ page }>
						<Button
							size="small"
							variant={
								page === currentPage ? 'primary' : 'secondary'
							}
							onClick={ createHandlePaginationClick( page ) }
						>
							{ page }
						</Button>
					</li>
				);
			} ) }
		</ul>
	);
}
