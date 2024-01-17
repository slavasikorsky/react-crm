import styled from "styled-components";

export const SelectWrapper = styled.div`
	width: 100px;
	text-align: right;
	span {
		display: none;
	}
	${({ theme }) => theme.mediaQuery.md} {
		width: 200px;
		span {
			display: inline-block;
		}
	}
`;
