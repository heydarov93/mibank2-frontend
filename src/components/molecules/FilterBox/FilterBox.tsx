import { Box, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { FilterGroupOptions } from '../FilterGroupOptions/FilterGroupOptions';

import { FilterTitle, PopoverTrigger } from './FilterBox.styled';

import { FilterIcon } from 'components/atoms';
import { FilterGroup } from 'models/IFilterInfo';

export interface FilterBoxProps {
  title: string;
  groups: FilterGroup[];
  onFilterChange?: (groups: FilterGroup[]) => void;
}

export const FilterBox: React.FC<FilterBoxProps> = ({
  title,
  groups,
  onFilterChange,
}: FilterBoxProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(groups);

  useEffect(() => {
    setFilterGroups(groups);
  }, [groups]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (
    groupIndex: number,
    optionName: string,
    checked: boolean,
  ) => {
    const newGroups = filterGroups.map((group, index) => {
      if (index !== groupIndex) return group;
      return {
        ...group,
        options: group.options.map((option) =>
          option.name === optionName ? { ...option, checked } : option,
        ),
      };
    });
    setFilterGroups(newGroups);
    if (onFilterChange) {
      onFilterChange(newGroups);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <PopoverTrigger onClick={handleClick}>
        <FilterIcon />
        <FilterTitle>{title}</FilterTitle>
      </PopoverTrigger>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            style: {
              width: anchorEl ? anchorEl.clientWidth : 'auto',
            },
          },
        }}
      >
        {filterGroups.map((group, groupIndex) => (
          <FilterGroupOptions
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            onOptionChange={handleOptionChange}
          />
        ))}
      </Popover>
    </Box>
  );
};
