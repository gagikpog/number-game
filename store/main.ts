import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomNumber, matchNumbers, IQueryItem, isClient, ServiceEvents, ResponseActions, IRequest, getPickId } from '../common/utils';
import { Service } from '../common/service';
import { AlertColor } from '@mui/material';

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
            const anotherPeersId = getPickId(window.location.href);
            if (anotherPeersId) {
                store.dispatch(connectTo(anotherPeersId));
            }
        });
        service.subscribe<boolean>(ServiceEvents.connection ,(connected: boolean) => {
            store.dispatch(setConnection(connected));
        });
        service.subscribe<IRequest>(ServiceEvents.data ,(request: IRequest) => {
            switch (request.data.action) {
                case ResponseActions.getMatching:
                    const requestPayload = request.data.payload as {number: string};
                    const number = requestPayload.number;
                    const privateNumber = store.getState().privateNumber
                    const res = matchNumbers(privateNumber, number);
                    const payload = {
                        number,
                        queryRes: res
                    };
                    store.dispatch(rivalQuery(payload));
                    return service.send({
                        needResult: false,
                        callId: request.callId,
                        data: {
                            action: ResponseActions.getMatching,
                            payload
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
        }).then((res): string => {
            return res?.data.payload as string;
        });
    }
);

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        privateNumber: getRandomNumber(),
        state: GameState.Start,
        queryList: [] as IQueryItem[],
        rivalQueryList: [] as IQueryItem[],
        pickId: '',
        connected: false,
        message: {
            text: '',
            type: 'error' as AlertColor
        }
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
        },
        rivalQuery: (state, action) => {
            state.rivalQueryList.push(action.payload);
        },
        showMessage: (state, action) => {
            state.message = {
                text: action.payload?.text || '',
                type: action.payload?.type || 'error'
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(queryNumber.fulfilled, (state, action) => {
            state.queryList.push(action.payload as unknown as IQueryItem);
        });
    }
});

export const { setPrivateNumber, setGameState, generatePrivateNumber, connectTo, setPickId, setConnection, rivalQuery, showMessage } = gameSlice.actions;
export { queryNumber };

export const store = configureStore({
    reducer: gameSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
