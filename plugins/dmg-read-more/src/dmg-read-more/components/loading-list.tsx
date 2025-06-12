export default function LoadingList( { className } ) {
	return (
		<div className={ className }>
			<ul>
				{ [ ...Array( 10 ) ].map( ( _, i ) => (
					<li key={ i } className="read-more__post" />
				) ) }
			</ul>
			<ul className="read-more__pagination" />
		</div>
	);
}
