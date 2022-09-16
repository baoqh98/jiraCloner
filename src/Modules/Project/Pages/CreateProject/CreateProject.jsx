import { InputLabel, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Container } from '@mui/system';
import { Editor, EditorState } from 'draft-js';
import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return <Editor editorState={editorState} onChange={setEditorState} />;
};

const CreateProject = () => {
  return (
    <Container sx={{ marginTop: '32px' }} maxWidth='xl'>
      <Typography variant='h5' fontWeight={700}>
        Create New Project
      </Typography>
      <Grid2 sx={{ textAlign: 'left' }} container>
        <Grid2 marginTop={2} xs={4}>
          <InputLabel sx={{ fontSize: '14px' }}>Project Name</InputLabel>
          <TextField
            size='small'
            placeholder="Input your project's name"
            fullWidth
          />
          <RichTextEditor />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CreateProject;
