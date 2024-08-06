import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
	margin-top: 20px;
`;

const ResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const SearchResults = ({ results }) => {

	return (
		<ResultsContainer>
			{results.length === 0 ? (
			<p>no result</p>
			) : (
					results.map((result, index) => (
				<ResultItem key={index}>
					{result.message}
					{result.answer}
				</ResultItem>
			)))}
		</ResultsContainer>
	);
};

export default SearchResults;
