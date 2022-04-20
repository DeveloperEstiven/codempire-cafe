import { useAppDispatch } from '@hooks/redux';
import { setActiveFilter, setIsFilterApplied } from '@store/reducers/main-page';
import { showScrollBar } from '@utils/scrollbar';
import { TInputEvent } from 'typings/api';
import { IFiltersDrawer } from './filters-drawer.typings';

export const useFiltersDrawerState = (props: IFiltersDrawer) => {
  const { checkedState, setCheckedState, setIsActive } = props;
  const dispatch = useAppDispatch();

  const handleCheck = (e: TInputEvent) => {
    const value = e.target.value;
    let newState;
    if (checkedState.includes(value)) {
      newState = checkedState.filter((title) => title !== value);
    } else {
      newState = [...checkedState, value];
    }
    setCheckedState(newState);
  };

  const onCloseDrawer = () => {
    showScrollBar();
    setIsActive(false);
  };

  const onFiltersApply = () => {
    dispatch(setIsFilterApplied(!!checkedState.length));
    showScrollBar();
    setIsActive(false);
    dispatch(setActiveFilter(checkedState));
  };

  return {
    handleCheck,
    onCloseDrawer,
    onFiltersApply,
  };
};
