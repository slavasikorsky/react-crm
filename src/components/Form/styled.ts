import styled from "styled-components";
export const Field = styled.div`
	label {
		cursor: pointer;
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		gap: 5px;
		margin: 12px 0 0;
	}
	input {
		height: 32px;
		padding: 0 12px;
		border-radius: 4px;
	}
`;
export const Error = styled.span`
	color: red;
	font-style: italic;
`;
