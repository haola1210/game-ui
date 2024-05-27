import { ROUTES } from '@constants/routes';
import Battle from '@pages/Battle';
import Login from '@pages/Login';
import Room from '@pages/Room';
import RoomList from '@pages/RoomList';
import { useRoutes } from 'react-router-dom';

const RouteContainer = () => {
  return useRoutes([
    {
      element: <>hihi</>,
      path: `${ROUTES.HOME_PAGE}`,
      index: true,
    },
    {
      element: <Battle />,
      path: `${ROUTES.BATTLE}/:idPlayer1/:idPlayer2`,
      index: true,
    },
    {
      element: <Login />,
      path: ROUTES.LOGIN,
    },
    {
      element: <RoomList />,
      path: ROUTES.ROOM_LIST,
    },
    {
      element: <Room />,
      path: `${ROUTES.ROOM}/:id`,
    },
  ]);
};

export default RouteContainer;
