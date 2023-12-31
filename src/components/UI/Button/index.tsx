import styled from "styled-components";

interface Props {
	children: string;
	type?: "submit" | "button";
	onClick?: () => void;
	disabled?: boolean;
	rest?: JSX.Element | JSX.Element[];
}

const ButtonElement = styled.button`
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.2rem 0.6rem;
	margin: 0.2rem;
	text-transform: uppercase;
	color: ${(props) => props.theme.value.secondary_text_color};
	background-color: ${(props) => props.theme.value.secondary_bg_color};
	cursor: pointer;
	transition: all 0.25s linear;
	&:hover {
		color: ${(props) => props.theme.value.active_color};
		border-radius: 0;
	}
`;

type ButtonProps = Props;

function Button({ children, onClick, type, disabled, ...rest }: ButtonProps) {
	return (
		<ButtonElement
			type={type || "button"}
			onClick={onClick}
			disabled={disabled || false}
			{...rest}
		>
			{children}
		</ButtonElement>
	);
}

export default Button;

Button.defaultProps = {
	onClick: false,
	rest: null,
};
