// import { createSlice } from '@reduxjs/toolkit';
// import thunk from '../../../app/apis/helper/thunk';
// import usersAPIs from '../../../app/apis/userAPIs/usersAPIs';

// const initialState = {
//   // members: [],
//   membersById: [],
//   isLoading: false,
//   error: '',
// };

// const { getUsers, getUserByProjectId, deleteUser } = usersAPIs;

// export const getUserThunk = thunk.request('members/getUsers', getUsers);
// export const deleteUserThunk = thunk.request('members/deleteUser', deleteUser);
// export const getUserByProjectIdThunk = thunk.request(
//   'members/getUserByProjectId',
//   getUserByProjectId
// );

// const membersSlice = createSlice({
//   name: 'members',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUserByProjectIdThunk.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         getUserByProjectIdThunk.fulfilled,
//         (state, { meta, payload }) => {
//           // console.log({ projectId: meta.arg, users: payload });
//           return {
//             ...state,
//             isLoading: false,
//             membersById: [
//               ...state.membersById,
//               { projectId: meta.arg, users: payload },
//             ],
//           };
//         }
//       )
//       .addCase(getUserByProjectIdThunk.rejected, (state, { payload }) => {
//         return {
//           ...state,
//           isLoading: false,
//           error: payload,
//         };
//       });
//   },
// });

// export default membersSlice.reducer;
