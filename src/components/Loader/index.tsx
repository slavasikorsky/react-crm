import styled from "styled-components";
import IconLoader from "../UI/Icons/IconLoader";

const LoaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 80vh;
`;

function Loader() {
	return (
		<LoaderWrapper>
			<IconLoader />
		</LoaderWrapper>
	);
}

export default Loader;
