import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomNumber, matchNumbers, IQueryItem } from '../common/utils';
export enum GameState {
    Game = 'game',
    Start = 'start',
    EndGame = 'endGame',
    Waiting = 'waiting'
}

const queryPrivateNumber = getRandomNumber();

const queryNumber = createAsyncThunk(
    'game/queryNumber',
    (value: string) => {
        return Promise.resolve(matchNumbers(queryPrivateNumber, value)).then((queryRes: string) => {
            return {
                number: value,
                queryRes
            };
        });
    }
);

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        privateNumber: getRandomNumber(),
        state: GameState.Start,
        queryList: [] as IQueryItem[]
    },
    reducers: {
        setPrivateNumber: (state, action) => {
            state.privateNumber = action.payload;
        },
        generatePrivateNumber: (state) => {
            state.privateNumber = getRandomNumber();
        },
        setGameState: (state, action) => {
            state.state = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(queryNumber.fulfilled, (state, action) => {
            state.queryList.push(action.payload as unknown as IQueryItem);
        });
    }
});

export const { setPrivateNumber, setGameState, generatePrivateNumber } = gameSlice.actions;
export { queryNumber };

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;

