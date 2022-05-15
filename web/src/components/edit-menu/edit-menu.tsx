import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppDispatch } from '@hooks/redux';
import { useLazyGetMenuQuery, useUpdateMenuMutation } from '@services/main-page-api';
import { updatedMenuReceived } from '@store/reducers/main-page';
import { IMenu, IResponseError, IUpdateMenu } from 'typings/api';
import { EditMenuForm } from './edit-menu-form';
import { THandleEditMenu } from './edit-menu-form/edit-menu-form.typings';
import { IEditMenuProps } from './edit-menu.typings';

export const EditMenu: React.FC = () => {
  const { state } = useLocation() as IEditMenuProps;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [updateMenu, { data: updatedMenu, error }] = useUpdateMenuMutation();
  const [getMenu, { data: receivedMenu, error: menuNotFound }] = useLazyGetMenuQuery();
  const [menu, setMenu] = useState<IMenu>();
  const { menuId } = useParams();

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  useEffect(() => {
    receivedMenu && setMenu(receivedMenu);
  }, [receivedMenu]);

  useEffect(() => {
    menuNotFound && navigate(ROUTES.mainPage);
  }, [menuNotFound]);

  useEffect(() => {
    if (!state) {
      menuId ? getMenu(menuId) : navigate(ROUTES.mainPage);
    }
  }, [state]);

  useEffect(() => {
    if (updatedMenu) {
      dispatch(updatedMenuReceived(updatedMenu));
    }
  }, [updatedMenu]);

  const onEditMenu: THandleEditMenu = async (newMenu) => {
    await trackPromise(updateMenu(newMenu as IUpdateMenu).unwrap(), PROMISES_AREA.updateMenu);
    successMixin({ title: `${newMenu.name} has been successfully updated` }).fire();
    navigate(ROUTES.mainPage);
  };

  return <>{(state || menu) && <EditMenuForm onEditMenu={onEditMenu} menu={state?.item || menu} />}</>;
};
