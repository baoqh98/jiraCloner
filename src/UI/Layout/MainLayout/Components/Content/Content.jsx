import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs, colors, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container, Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { useRequest } from '../../../../../app/hooks/request/useRequest';
import projectAPIs from '../../../../../app/apis/projectAPIs/projectAPIs';

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginLeft: '312px',
  padding: '24px 16px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  height: '100vh',
}));

const { getProjectDetail } = projectAPIs;

const Content = () => {
  const { projectId = null } = useParams();
  const { data: projectDetail } = useRequest(
    () => getProjectDetail(+projectId),
    {
      isManual: false,
      deps: [+projectId],
    }
  );
  const { pathname } = useLocation();

  let breadcrumbsData = projectId
    ? `/project/board/ ${projectDetail ? projectDetail.projectName : ''}`
    : pathname;

  const transformBreadcrumbsData = breadcrumbsData
    .slice(1)
    .split('/')
    .map((item) => item.replace(/%20/g, ' '));

  return (
    <ContentWrapper>
      <div id='draggable'></div>
      <Container maxWidth='xl'>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <Breadcrumbs aria-label='breadcrumb'>
              {transformBreadcrumbsData?.map((item) => (
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '14px',
                    color: colors.grey[600],
                    fontWeight: 700,
                  }}
                  key={item}
                  color='text.primary'
                >
                  {item}
                </Typography>
              ))}
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Container>
      <Outlet />
    </ContentWrapper>
  );
};

export default Content;
