import cn from 'classnames';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortStatus {
  All = 'all',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

type Props = {
  sortField: string;
  isReversed: boolean;
};
function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: Props,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortStatus.Alphabetical:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortStatus.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortStatus>(SortStatus.All);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleResetClick = () => {
    setSortField(SortStatus.All);
    setIsReversed(false);
  };

  const isSorted = sortField !== SortStatus.All || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortStatus.Alphabetical,
          })}
          onClick={() => setSortField(SortStatus.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortStatus.Length,
          })}
          onClick={() => setSortField(SortStatus.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
