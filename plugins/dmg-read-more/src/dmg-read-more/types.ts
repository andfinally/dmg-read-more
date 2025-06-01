export type Post = {
	id: number;
	link: string;
	title: {
		raw: string;
		rendered: string;
	};
}

export type SearchArgs = {
	per_page?: number;
	exclude?: number | number[];
	search?: string;
	page?: number;
	include?: number | number[];
	_fields?: string | string[];
}
