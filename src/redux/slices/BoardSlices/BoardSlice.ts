import { createSlice } from '@reduxjs/toolkit';
import swapElements from '../../../util/swapElements';
import { arrayMove } from '@dnd-kit/sortable';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    loading: true,
    selectedProjectName: '',
    selectedProjectId: '',
    selectedProjectBoardData: [],
  },
  reducers: {
    setProjectName: (state: any, action: { payload: string }) => {
      state.selectedProjectName = action.payload;
    },
    setProjectData: (
      state: any,
      action: { payload: { id: string; boardData: any } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData;
      state.selectedProjectId = action.payload.id;
    },
    setLoading: (state: any, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setSelectedProjectData: (
      state: any,
      action: { payload: { name: string; id: string; boardData: any } }
    ) => {
      state.selectedProjectBoardData = action.payload.boardData.sort(
        (a, b) => a.position - b.position
      );
      state.selectedProjectId = action.payload.id;
      state.selectedProjectName = action.payload.name;
    },
    updateBoardPosition: (
      state: any,
      action: { payload: { activeBoard: string; overBoard: string } }
    ) => {
      const activeBoardIndex = state.selectedProjectBoardData.findIndex(
        (board: any) => board._id === action.payload.activeBoard
      );
      const overBoardIndex = state.selectedProjectBoardData.findIndex(
        (board: any) => board._id === action.payload.overBoard
      );

      state.selectedProjectBoardData = arrayMove(
        state.selectedProjectBoardData,
        activeBoardIndex,
        overBoardIndex
      );
    },
  },
});

export default boardSlice;
