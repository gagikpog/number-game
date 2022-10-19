import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomNumber, matchNumbers, IQueryItem, isClient, ServiceEvents, ResponseActions, IRequest } from '../common/utils';
import { Service } from '../common/service';

export enum GameState {
    Game = 'game',
    Start = 'start',
    EndGame = 'endGame',
    Waiting = 'waiting'
}
let service: Service;

if (isClient()) {
    import('../common/service').then(({Service: _Service}) => {
        service = new _Service();
        service.subscribe<string>(ServiceEvents.open ,(peerId: string) => {
            store.dispatch(setPickId(peerId));
        });
        service.subscribe<boolean>(ServiceEvents.connection ,(connected: boolean) => {
            store.dispatch(setConnection(connected));
        });
        service.subscribe<IRequest>(ServiceEvents.data ,(request: IRequest) => {
            switch (request.data.action) {
                case ResponseActions.getMatching:
                    const number = request.data.payload.number as string;
                    const privateNumber = store.getState().privateNumber
                    const res = matchNumbers(privateNumber, number);
                    return service.send({
                        needResult: false,
                        callId: request.callId,
                        data: {
                            action: ResponseActions.getMatching,
                            payload: {
                                number,
                                queryRes: res
                            }
                        }
                    });
                    break;
            }
        });
    });
}

const queryNumber = createAsyncThunk(
    'game/queryNumber',
    (value: string) => {
        return service.send({
            needResult: true,
            callId: '',
            data: {
                action: ResponseActions.getMatching,
                payload: {
                    number: value
                }
            }
        }).then((res: IRequest): string => {
            return res.data.payload as string;
        });
    }
);

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        privateNumber: getRandomNumber(),
        state: GameState.Start,
        queryList: [] as IQueryItem[],
        pickId: '',
        connected: false
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
        },
        connectTo: (state, action) => {
            service?.connectTo(action.payload);
        },
        setPickId: (state, action) => {
            state.pickId = action.payload;
        },
        setConnection: (state, action) => {
            state.connected = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(queryNumber.fulfilled, (state, action) => {
            state.queryList.push(action.payload as unknown as IQueryItem);
        });
    }
});

export const { setPrivateNumber, setGameState, generatePrivateNumber, connectTo, setPickId, setConnection } = gameSlice.actions;
export { queryNumber };

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
