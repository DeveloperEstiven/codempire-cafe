import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { EditMenuForm } from '@components/edit-menu/edit-menu-form';
import { THandleEditMenu } from '@components/edit-menu/edit-menu-form/edit-menu-form.typings';
import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAddMenuMutation } from '@services/main-page-api';
import { IResponseError, TAddMenu } from 'typings/api';

export const AddMenu: React.FC = () => {
  const navigate = useNavigate();
  const [addMenu, { error }] = useAddMenuMutation();

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  const onAddMenu: THandleEditMenu = async (newMenu: TAddMenu) => {
    await trackPromise(addMenu(newMenu).unwrap(), PROMISES_AREA.updateMenu);
    successMixin({ title: `${newMenu.name} has been successfully added` }).fire();
    navigate(ROUTES.mainPage);
  };

  return <EditMenuForm onEditMenu={onAddMenu} />;
};
