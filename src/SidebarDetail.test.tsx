import React from 'react';
import { render, screen } from '@testing-library/react';
import { SingleFeatureTable } from './SidebarDetail';
import { CatalogFeature } from './api/catalog';

describe('SingleFeatureTable', () => {
  test('renders attributes of a third-party item that has no metadata (国土数値情報)', () => {
    // Items in public/api/thirdPartyCatalog.json have no `metadata`.
    const feature = {
      catalog: {
        type: 'DataItem',
        id: 'thirdParty/国土数値情報/小学校区',
        shortId: 'WHH',
        name: '小学校区',
        class: '小学校区',
      },
      properties: { 名称: '木太北部小学校', 所在地: '高松市木太町2613' },
    } as unknown as CatalogFeature;

    render(<SingleFeatureTable feature={feature} />);

    expect(screen.getByText('木太北部小学校')).toBeInTheDocument();
    expect(screen.getByText('高松市木太町2613')).toBeInTheDocument();
  });

  test('orders attributes by metadata.attributesOrder when it is given', () => {
    const feature = {
      catalog: {
        type: 'DataItem',
        id: 'test',
        shortId: 'T',
        name: 'テスト',
        class: 'テスト',
        metadata: { attributesOrder: ['b', 'a'] },
      },
      properties: { a: '値A', b: '値B' },
    } as unknown as CatalogFeature;

    render(<SingleFeatureTable feature={feature} />);

    const rows = screen.getAllByRole('row').map((row) => row.textContent);
    expect(rows).toEqual(['b値B', 'a値A']);
  });
});
