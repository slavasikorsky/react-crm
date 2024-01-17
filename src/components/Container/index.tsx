import styled from "styled-components";
interface ContainerProps {
	padding?: string;
	margin?: string;
	maxWidth?: string;
	align?: string;
	justify?: string;
	direction?: string;
}
export const Container = styled.div<ContainerProps>`
	display: flex;
	flex-direction: ${({ direction }) => direction || "column"};
	align-items: ${({ align }) => align || "flex-start"};
	justify-content: ${({ justify }) => justify || "flex-start"};
	padding: ${({ padding, theme }) => padding || theme.spacing[4]};
	margin: ${({ margin }) => margin || "0 auto"};
	width: 100%;
	max-width: ${({ maxWidth, theme }) => maxWidth || theme.base.maxWidth};
`;
