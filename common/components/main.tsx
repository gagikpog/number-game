import type { NextPage } from 'next';
import Player from './player';
import Rival from './rival';
import Header from './header';
import Connection from './connection';

import main from '../../styles/main.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/main';

const Main: NextPage = () => {

    const connected = useSelector((state: RootState) => state.connected)

    return (
        <div className='tw-flex tw-w-full tw-h-full tw-flex-col'>
            <Header />
            <div className='tw-flex tw-flex-1 tw-justify-center tw-p-8'>
                <div className={`tw-flex tw-w-full ${main.container}`}>
                    {
                        connected ? <><Player></Player> <Rival></Rival></> : <Connection/>
                    }
                </div>
            </div>
        </div>
    );
}

export default Main;
