import { BattleField } from '@components/3D';
import { ROUTES } from '@constants/routes';
import Login from '@pages/Login';
import Room from '@pages/Room';
import RoomList from '@pages/RoomList';
import { useRoutes } from 'react-router-dom';

const RouteContainer = () => {
  return useRoutes([
    {
      element: <BattleField />,
      path: ROUTES.HOME_PAGE,
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
      path: ROUTES.ROOM,
    },
  ]);
};

export default RouteContainer;
