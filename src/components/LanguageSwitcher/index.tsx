import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
	const { i18n, t } = useTranslation();
	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};
	return (
		<>
			<button type="button" onClick={() => changeLanguage("en")}>
				{t("enButtonLabel")}
			</button>
			<button type="button" onClick={() => changeLanguage("ua")}>
				{t("uaButtonLabel")}
			</button>
		</>
	);
};

export default LanguageSwitcher;
