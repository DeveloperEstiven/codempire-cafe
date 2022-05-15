import * as Yup from 'yup';

import { error } from '@constants/errors';

export const multiSelectValidation = (textMin: string, min: number = 1) =>
  Yup.array()
    .min(min, textMin)
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      })
    );

export const stringRequired = (name: string) => Yup.string().required(error(name).required);
