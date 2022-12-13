import React, { useMemo } from 'react';


import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { getAllParams, isSectionTop, isSectionUser } from '../../store/gallery/gallerySelector';
import { setParams } from '../../store/gallery/gallerySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GetAllGalleryParams, SectionTypeEnum, SortTypeEnum, WindowTypeEnum } from '../../types';
import ActionDropdown, { ActionDropdownOption } from '../DropDown/ActionDropDown';
import './index.scss'
type ItemActionsOptionsType = 'section' | 'sort' | 'window' | 'viralFilter'

const GalleryFilters = ({
    handleFilterDropdownChange,
    params,
    actions,
    handleOnParamsChange
}: {
    handleFilterDropdownChange?: (args: any) => void;
    handleOnParamsChange: (args: GetAllGalleryParams) => void;
    params?: GetAllGalleryParams;//params
    actions: ItemActionsOptionsType[];
}) => {
    const isSectionUserValue = useAppSelector(isSectionUser);
    const isSectionTopValue = useAppSelector(isSectionTop);
    const dispatch = useAppDispatch();


    const sectionOptions: ActionDropdownOption[] = useMemo(() => {
        return Object.entries(SectionTypeEnum).map(
            ([value, content]) => ({
                value,
                label: content,
            }),
        );
    }, [])
    const sortOptions: ActionDropdownOption[] = useMemo(() => {
        return Object.entries(SortTypeEnum).map(
            ([value, content]) => ({
                value,
                label: content,
            }),
        );
    }, [])
    const windowOptions: ActionDropdownOption[] = useMemo(() => {
        return Object.entries(WindowTypeEnum).map(
            ([value, content]) => ({
                value,
                label: content,
            }),
        );
    }, [])

    const ItemActions = {
        section: (
            <ActionDropdown
                options={sectionOptions}
                className='sort-dropdown-wrapper'
                value={params?.section}
                onChange={({ option }) => {
                    handleOnParamsChange({
                        section: option?.value,
                        sort: 'viral',
                        window: 'day',
                        page: 1
                    })
                }
                }
            />
        ),
        sort: (
            <ActionDropdown
                options={sortOptions}
                className='sort-dropdown-wrapper'
                disabled={!isSectionUserValue}
                value={params?.sort}
                onChange={({ option }) =>
                    handleOnParamsChange({
                        sort: option?.value,
                        page: 1

                    })
                }
            />
        ),
        window: (
            <ActionDropdown
                options={windowOptions}
                disabled={!isSectionTopValue}
                className='sort-dropdown-wrapper'
                value={params?.window}
                onChange={({ option }) =>
                    handleOnParamsChange({
                        window: option?.value,
                        page: 1
                    })
                }
            />
        ),
        viralFilter: (
            <ButtonGroup className='ms-3 gallery-viral-filter'>
                <ToggleButton
                    className={`d-flex align-items-center ${params?.viral ? 'isChecked' : ''}`}
                    id='toggle-check'
                    type='checkbox'
                    variant='secondary'
                    checked={params?.viral}
                    value={'isArchived'}
                    onChange={(e) =>
                        handleOnParamsChange({
                            viral: !params?.viral
                        })
                    }
                >
                    Allow  Viral
                </ToggleButton>
            </ButtonGroup>
        ),
    };

    return (
        <div className='col-12'>
            {actions.some((val) => Object.keys(ItemActions).includes(val)) && (
                <div className='mb-3 mx-auto mt-3 d-flex  justify-content-between gallery-filters-wrapper'>
                    {actions.map((actionKey) => (
                        <React.Fragment key={actionKey}>
                            {ItemActions[actionKey as ItemActionsOptionsType]}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryFilters;
