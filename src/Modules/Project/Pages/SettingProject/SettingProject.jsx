import {
  Autocomplete,
  Button,
  TextField,
  Typography,
  MenuItem,
  Collapse,
  styled,
  Box,
  colors,
  Chip,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { alpha, Container } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelector } from '../../../../app/store';
import projectCategory from '../../../../app/apis/projectCategory/projectCategory';
import { useRequest } from '../../../../app/hooks/request/useRequest';
import {
  clearProjectDetail,
  getAllProjectsThunk,
  getProjectDetailThunk,
  updateProjectThunk,
} from '../../slice/projectSlice';
import RichTextEditor from '../../../../UI/Modules/RichTextEditor/RichTextEditor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import LexicalEditor from '../../../../UI/Modules/LexicalEditor/LexicalEditor';

const CategorySelection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '8px',
  alignItems: 'center',
}));

const categoryProjectMap = {
  app: 'Dự án phần mềm',
  web: 'Dự án web',
  mobile: 'Dự án di động',
};

const { getProjectCategory } = projectCategory;

const SettingProject = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const { projects, projectDetail } = useSelector(projectSelector);
  const { data: projectCategory } = useRequest(getProjectCategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      projectName: '',
    },
  });

  const dispatch = useDispatch();

  const options = projects.map((item) => ({
    label: item.projectName,
    projectId: item.id,
  }));

  const selectProjectHandler = async (id) => {
    try {
      if (errors?.projectName) return;

      await dispatch(getProjectDetailThunk(id)).unwrap();
      setIsEditOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const selectCategoryHandler = (id) => {
    if (selectedCategory !== id) {
      setSelectedCategory(id);
    } else {
      setSelectedCategory(null);
    }
  };

  const activeCategoryStyle = (id, theme) => {
    if (selectedCategory === id) {
      return {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
      };
    }
  };

  const watchEditor = (html) => {
    // setDescription(html);
  };

  const updateProjectHandler = async (e) => {
    try {
      e.preventDefault();
      if (errors?.projectName) return;
      if (!projectDetail) {
        throw new Error('Project is unselected');
      }
      const { id, creator } = projectDetail;
      const updatedProject = {
        id,
        projectName: selectedProjectName,
        creator: creator.id,
        description,
        categoryId: `${selectedCategory}`,
      };

      console.log(description);

      // const data = await dispatch(updateProjectThunk(updatedProject)).unwrap();
      // console.log(data);
    } catch (error) {
      setError('projectName', { message: error.message });
    }
  };

  useEffect(() => {
    dispatch(getAllProjectsThunk());

    if (projectDetail) {
      const { description, projectCategory } = projectDetail;
      setSelectedCategory(projectCategory.id);
      setDescription(description);
    }
  }, [projectDetail]);

  useEffect(() => {
    return () => {
      dispatch(clearProjectDetail());
    };
  }, []);

  return (
    <>
      <Container
        sx={{
          marginTop: '24px',
        }}
        maxWidth='sm'
      >
        <form onSubmit={handleSubmit(updateProjectHandler)}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <Typography align='left' variant='h5' fontWeight={700}>
                Project Setting
              </Typography>
            </Grid2>
            <Grid2 display='flex' justifyContent='center' columnGap={2} xs={8}>
              <Autocomplete
                freeSolo
                onChange={(event, value) => {
                  if (value === null) return;
                  setSelectedProjectId(value.projectId);
                }}
                onInputChange={(event, value) => {
                  if (!value) return;
                  setSelectedProjectName(value);
                }}
                size='small'
                disablePortal
                options={options}
                isOptionEqualToValue={(option, value) =>
                  option.projectId === value.projectId
                }
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.projectId}>
                    {option.label}
                  </MenuItem>
                )}
                sx={{
                  transition: 'all ease 0.2s',
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    size='small'
                    {...params}
                    placeholder='Select project'
                    {...register('projectName', {
                      required: {
                        value: true,
                        message: 'This is required',
                      },
                      pattern: {
                        value: /^[^'"!@#$%^&*()?:;~`+=]*$/,
                        message: 'Not contain special character',
                      },
                    })}
                    fullWidth
                    color={errors.projectName ? 'error' : ''}
                    error={!!errors.projectName}
                    helperText={
                      errors.projectName?.message ||
                      `Project: ${projectDetail?.alias || ''}`
                    }
                  />
                )}
              />
            </Grid2>
            <Grid2 columnGap={2} xs={4}>
              {selectedProjectId && (
                <Button
                  variant='outlined'
                  onClick={() => selectProjectHandler(selectedProjectId)}
                >
                  Select
                </Button>
              )}
            </Grid2>
          </Grid2>

          <Collapse in={isEditOpen}>
            <Grid2 marginTop={4} container spacing={1}>
              <Grid2 xs={12}>
                <Typography align='left' variant='subtitle1' fontWeight={700}>
                  Select category
                </Typography>
              </Grid2>
              <Grid2 marginBottom={2} xs={12}>
                <CategorySelection>
                  {projectCategory?.map((item) => (
                    <Chip
                      key={item.id}
                      sx={(theme) => ({
                        color:
                          item.projectCategoryName === categoryProjectMap['app']
                            ? theme.palette.primary.light
                            : item.projectCategoryName ===
                              categoryProjectMap['web']
                            ? colors.green[500]
                            : colors.amber[500],
                        backgroundColor:
                          item.projectCategoryName === categoryProjectMap['app']
                            ? alpha(theme.palette.primary.light, 0.2)
                            : item.projectCategoryName ===
                              categoryProjectMap['web']
                            ? colors.green[50]
                            : colors.amber[50],
                        '&:hover': {
                          backgroundColor:
                            selectedCategory === item.id
                              ? theme.palette.secondary.light
                              : item.projectCategoryName ===
                                categoryProjectMap['app']
                              ? alpha(theme.palette.primary.main, 0.2)
                              : item.projectCategoryName ===
                                categoryProjectMap['web']
                              ? colors.green[100]
                              : colors.amber[100],
                        },
                        ...activeCategoryStyle(item.id, theme),
                      })}
                      onClick={() => selectCategoryHandler(item.id)}
                      label={item.projectCategoryName}
                    />
                  ))}
                </CategorySelection>
              </Grid2>
              <Grid2 xs={12}>
                <Typography align='left' variant='subtitle1' fontWeight={700}>
                  Description
                </Typography>
              </Grid2>

              <Grid2 marginBottom={2} xs={12}>
                {/* <RichTextEditor onWatch={watchEditor} content={description} /> */}
                <LexicalEditor onWatch={watchEditor} content={description} />
              </Grid2>

              <Grid2 xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  onClick={updateProjectHandler}
                  endIcon={<FontAwesomeIcon icon={faSave} />}
                >
                  Save
                </Button>
              </Grid2>
            </Grid2>
          </Collapse>
        </form>
      </Container>
    </>
  );
};

export default SettingProject;
