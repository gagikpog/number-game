import type { NextPage } from 'next';
import Player from './player';
import Rival from './rival';
import Header from './header';
import Connection from './connection';

import main from '../../styles/main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GameState, RootState, showMessage } from '../../store/main';
import { Alert, Snackbar } from '@mui/material';

const Main: NextPage = () => {

    const connected = useSelector((state: RootState) => state.connected);
    const message = useSelector((state: RootState) => state.message);
    const pickId = useSelector((state: RootState) => state.pickId);
    const dispatch =  useDispatch();
    const state = useSelector((state: RootState) => state.state);


    const handleMessageClose = () => {
        dispatch(showMessage({message: '', type: ''}));
    }

    return (
        <div className='tw-flex tw-w-full tw-h-full tw-flex-col'>
            <Header />
            <div className='tw-flex tw-flex-1 tw-justify-center tw-p-6 tw-mh-0'>
                <div className={`tw-flex tw-w-full ${main.container}`}>
                    {
                        connected ? <>
                            <Rival className={main.right} />
                            {
                                state === GameState.Start ? null : <Player />
                            }
                        </>
                        : (pickId ? <Connection/> : null)
                    }
                </div>
                <Snackbar open={!!message.text} autoHideDuration={6000} onClose={handleMessageClose}>
                    <Alert onClose={handleMessageClose} severity={message.type} sx={{ width: "100%" }}>
                        {message.text}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default Main;
