import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default AppLayout;
