export type ThemeType = {
	mode: string;
	primary_bg_color: string;
	primary_text_color: string;
	secondary_text_color: string;
	secondary_bg_color: string;
	active_color: string;
};

export type ClientsRow = {
	id: number;
	firstName: string;
	email: string;
	phone: string;
	address: { city: string };
	isDeleted?: boolean;
};
