import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../UI/Button";
import { SelectWrapper } from "./styled";

function LanguageSwitcher() {
	const { i18n, t } = useTranslation();
	const [language, setLanguage] = useState<string | null>(null);

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
		setLanguage(lang);
	};

	useEffect(() => {
		setLanguage(i18n.language || "en");
	}, []);

	return (
		<SelectWrapper>
			<span>{t("locale")}</span>
			{language == "en" ? (
				<Button onClick={() => changeLanguage("ua")}>en</Button>
			) : (
				<Button onClick={() => changeLanguage("en")}>ua</Button>
			)}
		</SelectWrapper>
	);
}

export default LanguageSwitcher;
