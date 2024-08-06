import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

const ResultsContainer = styled.div`
	margin-top: 20px;
`;

const ResultItem = styled(Card)`
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`;

const SearchResults = ({ results }) => {
  if (!results || Object.keys(results).length === 0) {
    return (
      <ResultsContainer>
        <Typography variant="body1" align="center">
          No results found.
        </Typography>
      </ResultsContainer>
    );
  }

  const { request_message, result_message, created_at } = results;

  return (
    <ResultsContainer>
      <ResultItem>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            검색 결과
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            요청 메시지: {request_message}
          </Typography>
          <Typography variant="h6" component="div" gutterBottom style={{ marginTop: '20px' }}>
            분석 결과:
          </Typography>
          <List>
            {result_message.map((answer, idx) => (
              <StyledListItem key={idx}>
                <Typography variant="body1">
                  답안{idx + 1}: {answer}
                </Typography>
              </StyledListItem>
            ))}
          </List>
          <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
            Created at: {new Date(created_at).toLocaleString()}
          </Typography>
        </CardContent>
      </ResultItem>
    </ResultsContainer>
  );
};


export default SearchResults;
