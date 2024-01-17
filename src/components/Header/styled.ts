import styled from "styled-components";

export const Heading = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	h1 {
		font-size: 1rem;
	}
	${({ theme }) => theme.mediaQuery.md} {
		h1 {
			font-size: 2rem;
		}
	}
`;
