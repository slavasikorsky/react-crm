import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../data/theme";
import { RootState } from "../../store/store";
import { changeTheme } from "../../store/themeSlice";

export default function Header() {
	const theme = useSelector((state: RootState) => state.theme.value.mode);
	const dispatch = useDispatch();
	return (
		<>
			React crm
			<select
				name="theme"
				value={theme}
				onChange={(e) => dispatch(changeTheme(e.target.value))}
			>
				<option value={darkTheme.mode}>{darkTheme.mode}</option>
				<option value={lightTheme.mode}>{lightTheme.mode}</option>
			</select>
		</>
	);
}
