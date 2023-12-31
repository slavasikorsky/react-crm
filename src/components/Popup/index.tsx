import styled from "styled-components";
import Button from "../UI/Button";

interface PopupProps {
	children: JSX.Element | JSX.Element[];
	trigger: boolean;
	setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupInner = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
`;

const PopupContent = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	z-index: 2;
	background-color: ${(props) => props.theme.value.primary_bg_color};
	padding: 20px;
`;

function Popup({ children, trigger, setTrigger }: PopupProps) {
	return trigger ? (
		<PopupInner role="presentation" onClick={() => setTrigger(false)}>
			<PopupContent
				role="presentation"
				onClick={(e) => e.stopPropagation()}
			>
				<Button onClick={() => setTrigger(false)}>x</Button>
				{children}
			</PopupContent>
		</PopupInner>
	) : null;
}

export default Popup;
