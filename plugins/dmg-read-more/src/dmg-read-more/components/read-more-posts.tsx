import { useCallback } from '@wordpress/element';
import Pagination from './pagination';
import type { Post } from '../types';

type ReadMorePostsProps = {
	posts?: Array<Post>;
	totalPages: number;
	handlePaginationClick: ( pageNumber: number ) => void;
	currentPage: number;
	selectPost: ( post: Post ) => void;
	selectedPostId: number;
}

export function ReadMorePosts( {
	posts = [],
	totalPages = 0,
	handlePaginationClick,
	currentPage = 1,
	selectPost,
	selectedPostId = 0,
}: ReadMorePostsProps ) {
	if ( ! posts || posts.length === 0 ) {
		return (
			<p>No posts found.</p>
		);
	}

	const createPostClickHandler = useCallback(
		( post: Post ) => () => selectPost( post ),
		[ selectPost ]
	);

	return (
		<>
			<ul>
				{
					posts.map( ( post: Post ) => {
						return (
							<li
								key={ post.id }
								onClick={ createPostClickHandler( post ) }
								className={ `read-more__post ${ post.id === selectedPostId ? 'read-more__post--selected' : '' }` }
							>
								{ post.title.rendered }
							</li>
						);
					} )
				}
			</ul>
			<Pagination
				totalPages={ totalPages }
				handlePaginationClick={ handlePaginationClick }
				currentPage={ currentPage }
			/>
		</>
	);
}
