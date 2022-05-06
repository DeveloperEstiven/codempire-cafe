import { SweetAlertOptions } from 'sweetalert2';

import { StyledOrderDetail as Styled } from './order-detail.styles';
import './order-detail.styles.css';

export const swalConfig: SweetAlertOptions = {
  title: <Styled.Cancel>Are you sure?</Styled.Cancel>,
  customClass: {
    popup: 'popup-container order-popup-container',
    actions: 'actions',
    cancelButton: 'cancel-btn',
    confirmButton: 'confirm-btn',
  },
  confirmButtonText: 'Yes',
  showCancelButton: true,
};
